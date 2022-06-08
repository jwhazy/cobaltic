#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::path::Path;
mod native;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![check_directory_exists])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn check_directory_exists(directory: String) -> bool {
  Path::new(&directory).exists().into()
}

#[tauri::command]
async fn get_manifests() {
    let result = reqwest::get("https://cobaltic.jacksta.workers.dev/api/clients").await;
    println!("{:?}", result);
}