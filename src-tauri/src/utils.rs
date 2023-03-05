use serde_json::Value;
use std::path::PathBuf;
use tauri::{self};

use reqwest;

#[tauri::command]
pub async fn get_manifests() -> Result<String, String> {
    let request = reqwest::get("https://cobaltic.jacksta.workers.dev/api/clients")
        .await
        .map_err(|e| e.to_string())?
        .text()
        .await
        .unwrap();

    Ok(request)
}

pub fn app_data_directory() -> PathBuf {
    let mut path = dirs::data_dir().unwrap();
    path.push("Cobaltic");
    path
}

#[tauri::command]
pub fn get_version() -> String {
    env!("CARGO_PKG_VERSION").to_string()
}

#[tauri::command]
pub async fn check_update() -> Result<bool, String> {
    let request = reqwest::get("https://cobaltic.jacksta.workers.dev/api/v2/info")
        .await
        .expect("Error while fetching manifests.")
        .text()
        .await
        .expect("Error while getting version from server.");

    let json: Value = serde_json::from_str(&request).expect("Version failed");

    let latest_version = json["prod"]["version"].to_string().replace('"', "");

    let self_version: &str = env!("CARGO_PKG_VERSION");

    log::info!("Latest version: {}", latest_version);
    log::info!("Self version: {}", self_version);

    if latest_version == self_version {
        Ok(false)
    } else {
        Ok(true)
    }
}
