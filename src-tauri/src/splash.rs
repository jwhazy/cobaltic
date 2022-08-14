use downloader::Downloader;
use log;
use platform_dirs::AppDirs;
use std::path::{Path, PathBuf};
use tauri::{
    self,
    api::process::{Command, CommandEvent},
    Window,
};

use log::{error, info, warn};

use crate::utils;

#[tauri::command]
pub async fn check() -> bool {
    Path::new(&utils::app_data_directory()).exists().into()
}

#[tauri::command]
pub async fn get() -> String {
    PathBuf::from(&utils::app_data_directory())
        .join(Path::new("splash.exe"))
        .display()
        .to_string()
        .into()
}

#[tauri::command]
pub async fn kill(window: Window) {
    // kill process with name "splash.exe"
    Command::new("taskkill")
        .args(&["/F", "/IM", "splash.exe"])
        .spawn()
        .expect("Error while killing splash.exe");

    warn!("Splash was manually killed.");

    window.emit("splash", "dead");
}

#[tauri::command]
pub async fn start(window: Window, args: [String; 4]) {
    // This is HORRIBLE code - please if you have suggestions make a PR or DM me.

    let splash_location: PathBuf =
        PathBuf::from(&utils::app_data_directory()).join(Path::new("splash.exe"));

    if check().await {
        window.emit("splash", "Splash not found. Downloading now.");

        std::thread::spawn(|| download())
            .join()
            .expect("Splash download panicked");
    }

    let (mut rx, mut _child) = Command::new(splash_location.display().to_string())
        .args(&args)
        .spawn()
        .expect("failed to start splash");

    tauri::async_runtime::spawn(async move {
        while let Some(event) = rx.recv().await {
            if let CommandEvent::Stdout(line) = event {
                info!("{}", line);

                window
                    .emit("splash", Some(format!("{}", line)))
                    .expect("splash message failed to send.");
            } else if let CommandEvent::Stderr(line) = event {
                info!("{:?}", line);
                window
                    .emit("splash", Some(format!("{}", line)))
                    .expect("splash message failed to send.");
            } else if let CommandEvent::Error(line) = event {
                error!("Splash error: {}", line);
                window
                    .emit("splash", Some(format!("{}", line)))
                    .expect("splash message failed to send.");
            }
        }
    });
}

#[tauri::command]
pub fn download() -> bool {
    let app_dirs = AppDirs::new(Some("Cobaltic"), true).unwrap();

    // https://github.com/hunger/downloader/blob/main/examples/tui_basic.rs
    let mut downloader = Downloader::builder()
        .download_folder(&app_dirs.config_dir)
        .user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36")
        .parallel_requests(1)
        .build()
        .unwrap();

    let splash = downloader::Download::new(
        "https://github.com/polynite/splash/releases/download/v1.1.5/splash_1.1.5_windows_amd64.exe",
    ).file_name(Path::new("splash.exe"));

    let result = downloader.download(&[splash]).unwrap();

    for r in result {
        match r {
            Err(e) => print!("Error occurred! {}", &e.to_string()),
            Ok(s) => print!("Success: {}", &s),
        };
    }

    true
}
