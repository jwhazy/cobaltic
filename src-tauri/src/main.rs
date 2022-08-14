#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use chrono::Utc;
use error_chain::error_chain;
use std::{fs, path::Path};
use tauri::Manager;
use tauri_plugin_log::{fern::colors::ColoredLevelConfig, LogTarget, LoggerBuilder};

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
    let targets = [LogTarget::LogDir, LogTarget::Stdout, LogTarget::Webview];
    let colors = ColoredLevelConfig::default();

    if !Path::exists(&utils::app_data_directory()) {
        fs::create_dir(&utils::app_data_directory().as_path()).expect("Create directory failed.");
    }

    tauri::Builder::default()
        .plugin(
            LoggerBuilder::new()
                .with_colors(colors)
                .targets(targets)
                .build(),
        )
        .setup(|app| {
            println!("Cobaltic v2.0.0 starting at {}", Utc::now());
            app.listen_global("splash", |event| {
                println!("got event-name with payload {:?}", event.payload());
            });

            app.listen_global("console", |event| {
                println!("{:?}", event.payload());
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_manifests,
            splash::check,
            splash::kill,
            splash::get,
            splash::start,
            splash::download,
            utils::restart_app,
            utils::devtools,
            utils::check_directory_exists,
            utils::get_version
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn get_manifests() -> String {
    reqwest::get("https://cobaltic.jacksta.workers.dev/api/clients")
        .await
        .expect("Error while fetching manifests.")
        .text()
        .await
        .expect("Error while parsing manifests.")
        .into()
}
