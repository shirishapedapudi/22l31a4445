export function logInfo(message: string, data?: any) {
  const logEntry = { type: "INFO", message, data, timestamp: new Date().toISOString() };

  let logs = JSON.parse(localStorage.getItem("logs") || "[]");
  logs.push(logEntry);
  localStorage.setItem("logs", JSON.stringify(logs));
}
