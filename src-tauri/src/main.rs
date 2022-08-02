#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::{path::{Path}, fs,};
use error_chain::error_chain;
use chrono::{Utc};

mod splash;
mod utils;


error_chain! {
     foreign_links {
         Io(std::io::Error);
         HttpRequest(reqwest::Error);
     }
}

#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}

fn main() {

  println!("Cobaltic v2.0.0 starting at {}", Utc::now());

  if !Path::exists(&utils::app_data_directory()) {
    fs::create_dir(&utils::app_data_directory().as_path()).expect("Create directory failed.");
  }
  
  
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_manifests, splash::check, utils::restart_app, splash::start, splash::download, utils::check_directory_exists])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
async fn get_manifests() -> String {
    reqwest::get("https://cobaltic.jacksta.workers.dev/api/clients")
    .await.expect("Error while fetching manifests.")
    .text()
    .await.expect("Error while parsing manifests.").into()
}