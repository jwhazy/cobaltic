use std::{path::{Path, PathBuf}, process::{Command}};
use downloader::{Downloader};
use error_chain::error_chain;
use platform_dirs::AppDirs;
use tauri;

use crate::utils;

error_chain! {
     foreign_links {
         Io(std::io::Error);
         HttpRequest(reqwest::Error);
     }
}


#[tauri::command]
pub async fn check() -> bool {
    Path::new(&utils::app_data_directory()).exists().into()
}

#[tauri::command]
pub async fn start(directory: String, manifest: String) {
  let splash_location: PathBuf = PathBuf::from(&utils::app_data_directory()).join(Path::new("splash.exe"));

  let splash_arguments: String = "-manifest ".to_owned() + &manifest + " -install-dir " + &directory;

  // TO-DO: Live update console output to UI so we don't need cmd.
  // I've looked into this and haven't found any solutions just yet.
  // We will do this until I find a solution or deprecate Splash.

  Command::new("cmd.exe")

    // This is HORRIBLE code
    .args(&["/C ".to_owned() + &'"'.to_string() + splash_location.to_str().unwrap() + &splash_arguments + " & echo. & echo Thank you for using Cobaltic v2.0.0 by jacksta (https://github.com/jwhazy/). & echo If an error occurred, try a different manifest ID. & pause" + &'"'.to_string()])
    .spawn()
    .expect("failed to execute process");
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