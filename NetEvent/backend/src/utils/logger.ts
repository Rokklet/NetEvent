import fs from "fs";
import path from "path";
import { Request } from "express";
import { AuthRequest } from "../middleware/auth";

const logsDirectory = path.resolve(
  __dirname,
  "../../logs"
);

const errorLogPath = path.join(
  logsDirectory,
  "errors.log"
);

if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory, {
    recursive: true,
  });
}

export function logError(
  error: unknown,
  req: Request
): void {
  const normalizedError =
    error instanceof Error
      ? error
      : new Error(String(error));

  const authRequest = req as AuthRequest;

  const logEntry = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    userId: authRequest.user?.id ?? null,
    userRole: authRequest.user?.role ?? null,
    errorName: normalizedError.name,
    message: normalizedError.message,
    stack: normalizedError.stack ?? null,
  };

  fs.appendFile(
    errorLogPath,
    `${JSON.stringify(logEntry)}\n`,
    writeError => {
      if (writeError) {
        console.error(
          "No se pudo escribir errors.log:",
          writeError
        );
      }
    }
  );
}