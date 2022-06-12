#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::{path::{Path}, fs::{File, self}, io::copy};
use platform_dirs::{AppDirs};
use error_chain::error_chain;


error_chain! {
     foreign_links {
         Io(std::io::Error);
         HttpRequest(reqwest::Error);
     }
}

fn main() {
  let app_dirs = AppDirs::new(Some("Cobaltic"), true).unwrap();
  
  fs::create_dir(app_dirs.config_dir.as_path());
  
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![check_directory_exists, get_manifests, check_splash, restart_app, app_data_directory, splash_downloader])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn check_directory_exists(directory: String) -> bool {
  Path::new(&directory).exists().into()
}

#[tauri::command]
async fn get_manifests() -> String {
    let content = reqwest::get("https://cobaltic.jacksta.workers.dev/api/clients")
    .await.expect("Error while fetching manifests.")
    .text()
    .await.expect("Error while parsing manifests.");

  content.into()
}

#[tauri::command]
async fn check_splash() -> bool {
    Path::new("").exists().into()
}

#[tauri::command]
fn restart_app() {
  open::that(std::env::current_exe().expect("App executable not found"));
  std::process::exit(0);

}

#[tauri::command]
fn app_data_directory() -> String {
  let app_dirs = AppDirs::new(Some("Cobaltic"), true).unwrap();

  app_dirs.config_dir.as_path().display().to_string().into()
}

#[tauri::command]
async fn splash_downloader() {
  download_splash().await;
}

async fn download_splash() -> Result<()> {
  let app_dirs = AppDirs::new(Some("Cobaltic"), true).unwrap();
    let target = "https://github.com/polynite/splash/releases/download/v1.1.5/splash_1.1.5_windows_amd64.exe";
    let response = reqwest::get(target).await?;
    let exe_name = "splash.exe";

    let mut dest = {
        let fname = response
            .url()
            .path_segments()
            .and_then(|segments| segments.last())
            .and_then(|exe_name | if exe_name.is_empty() { None } else { Some(exe_name) })
            .unwrap_or("tmp.bin");

        println!("file to download: '{}'", fname);            
        let fname = app_dirs.config_dir.as_path().join(fname);
        println!("will be located under: '{:?}'", fname);
        File::create(fname)?
    };
    let content =  response.text().await?;
    copy(&mut content.as_bytes(), &mut dest)?;
    Ok(())
}