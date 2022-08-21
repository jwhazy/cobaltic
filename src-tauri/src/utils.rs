use platform_dirs::AppDirs;
use std::path::Path;
use std::path::PathBuf;

use serde_json::Value;

#[tauri::command]
pub async fn get_manifests() -> String {
    reqwest::get("https://cobaltic.jacksta.workers.dev/api/clients")
        .await
        .expect("Error while fetching manifests.")
        .text()
        .await
        .expect("Error while parsing manifests.")
        .into()
}

#[tauri::command]
pub async fn check_update() -> bool {
    // More horrific Rust code.

    let request = reqwest::get("https://cobaltic.jacksta.workers.dev/api/v2/info")
        .await
        .expect("Error while fetching manifests.")
        .text()
        .await
        .expect("Error while getting version from server.");

    let json: Value = serde_json::from_str(&request).expect("Version failed");

    let latest_version = json["dev"]["version"].to_string();

    let self_version: &str = env!("CARGO_PKG_VERSION");

    if self_version == latest_version {
        false
    } else {
        true
    }
}

#[tauri::command]
pub fn check_directory_exists(directory: String) -> bool {
    Path::new(&directory).exists().into()
}

#[tauri::command]
pub fn restart_app() {
    open::that(std::env::current_exe().expect("App executable not found, somehow."))
        .expect("App executable found but not launched, somehow.");
    std::process::exit(0);
}

pub fn app_data_directory() -> PathBuf {
    AppDirs::new(Some("Cobaltic"), true)
        .unwrap()
        .config_dir
        .into()
}

#[tauri::command]
pub fn get_version() -> String {
    env!("CARGO_PKG_VERSION").to_string()
}
