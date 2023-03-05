#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::{fs, path::Path};

use log::info;
use tauri::Manager;
use tauri_plugin_log::{fern::colors::ColoredLevelConfig, LogTarget};
use window_shadows::set_shadow;
//use window_vibrancy::apply_mica;

mod splash;
mod utils;

#[tauri::command]
fn init_mica(app: tauri::AppHandle, window_title: String) -> Result<(), String> {
    let window = app.get_window(&window_title).unwrap();

    set_shadow(&window, true).unwrap();

    // Experimental mica
    // #[cfg(target_os = "windows")]
    // apply_mica(&window).expect("Unsupported platform! 'apply_blur' is only supported on Windows");
    Ok(())
}

fn main() {
    if !Path::exists(&utils::app_data_directory()) {
        fs::create_dir(&utils::app_data_directory().as_path()).expect("Create directory failed.");
    }

    tauri::Builder::default()
        .plugin(
            tauri_plugin_log::Builder::default()
                .targets([LogTarget::LogDir, LogTarget::Stdout, LogTarget::Webview])
                .with_colors(ColoredLevelConfig::default())
                .build(),
        )
        .invoke_handler(tauri::generate_handler![
            init_mica,
            utils::get_manifests,
            utils::get_version,
            utils::check_update,
            splash::start,
            splash::kill,
        ])
        .setup(|app| {
            info!("Cobaltic v2.0.2 starting...");

            let window = app.get_window("core").unwrap();
            set_shadow(&window, true).unwrap();

            // Experimental mica
            // #[cfg(target_os = "windows")]
            // apply_mica(&window)
            //     .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
