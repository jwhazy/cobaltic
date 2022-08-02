use std::path::Path;
use std::path::PathBuf;

use platform_dirs::AppDirs;

#[tauri::command]
pub fn check_directory_exists(directory: String) -> bool {
  Path::new(&directory).exists().into()
}

#[tauri::command]
pub fn restart_app() {
  open::that(std::env::current_exe().expect("App executable not found, somehow."));
  std::process::exit(0);
}

pub fn app_data_directory() -> PathBuf{
  AppDirs::new(Some("Cobaltic"), true).unwrap().config_dir.into()
}