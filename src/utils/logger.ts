import * as logger from "tauri-plugin-log-api";

type Level = "info" | "warn" | "error" | "debug" | "trace";

export default function log(level: Level, message: string) {
  logger[level || "info"](message);
}
