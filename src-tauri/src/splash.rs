use std::path::{Path, PathBuf};

use downloader::Downloader;
use log::{error, info};
use tauri::{
    self,
    api::process::{Command, CommandEvent},
    Window,
};

use crate::utils;

#[tauri::command]
pub async fn start(window: Window, args: [String; 4]) {
    let splash_location = utils::app_data_directory().join("splash.exe");

    if !splash_location.exists() {
        info!("Splash not found, downloading...");

        window
            .emit("splash", Some("Splash not found, downloading..."))
            .unwrap();
        std::thread::spawn(|| download().expect("Failed to download splash.exe"))
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
                // For some stupid reason splash outputs to Stderr and not Stdout?
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
pub fn kill(window: Window) {
    let mut _child = Command::new("taskkill")
        .args(&["/F", "/IM", "splash.exe"])
        .spawn()
        .expect("failed to kill splash");

    window
        .emit("splash", Some("Splash killed."))
        .expect("splash message failed to send.");
}

pub fn download() -> Result<(), Box<dyn std::error::Error>> {
    info!("Starting Splash download");
    let splash_location: PathBuf = PathBuf::from(&utils::app_data_directory());

    // https://github.com/hunger/downloader/blob/main/examples/tui_basic.rs
    let mut downloader = Downloader::builder()
        .download_folder(&splash_location)
        .user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36")
        .parallel_requests(1)
        .build()
        .unwrap();

    let splash = downloader::Download::new(
        "https://github.com/polynite/splash/releases/download/v1.1.5/splash_1.1.5_windows_amd64.exe",
    ).file_name(Path::new("splash.exe"));

    let result = downloader.download(&[splash]).unwrap();

    Ok(for r in result {
        match r {
            Err(e) => error!("Error occurred while downloading! {}", &e.to_string()),
            Ok(s) => error!("Download success: {}", &s),
        };
    })
}
