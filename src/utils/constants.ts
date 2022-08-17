/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
export enum State {
  LOADING = "Loading",
  CHOOSING_MANIFEST = "Choosing manifest",
  CHOOSING_SEASON = "Choosing season",
  FINALIZING = "Finalizing",
  DOWNLOADING = "Downloading",
  DOWNLOAD_COMPLETE = "Download complete",
  DOWNLOAD_FAILED = "Download failed",
  DOWNLOAD_CANCELLED = "Download cancelled",
  DOWNLOAD_PAUSED = "Download paused",
  UPDATE_AVAILABLE = "Update available",
  UPDATING = "Updating",
}

export enum Method {
  SPLASH = "Splash",
  NATIVE = "Native",
  LOG = "Log (debug only)",
}

export enum LogLevel {
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
  DEBUG = "debug",
  TRACE = "trace",
}
