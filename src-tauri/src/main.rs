#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use chrono::Utc;
use log::info;
use std::{fs, path::Path};
use tauri_plugin_log::{fern::colors::ColoredLevelConfig, LogTarget, LoggerBuilder};

mod splash;
mod utils;

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
        .setup(|_app| {
            info!("Cobaltic v2.0.0 starting at {:?}", Utc::now());
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            splash::check,
            splash::kill,
            splash::get,
            splash::start,
            splash::download,
            splash::silent_kill,
            utils::restart_app,
            utils::get_manifests,
            utils::check_update,
            utils::check_directory_exists,
            utils::get_version
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
