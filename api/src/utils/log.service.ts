import { Log, LogLevel } from "../models/core/log.models";

export class LogService {
    public static async logSuccess(operation: string, message: string, data: object, userId?: number): Promise<void> {
        try {
            const logEntry = Log.create({
                level: LogLevel.INFO,
                operation,
                message,
                data,
                userId: userId || null
            });
            await Log.save(logEntry);
        } catch (error) {
            console.error("CRITICAL: Fallo al guardar en el sistema de logs (SUCCESS).", error);
        }
    }
    public static async logError(operation: string, message: string, error: any, userId?: number): Promise<void> {
        try {
            const logEntry = Log.create({
                level: LogLevel.ERROR,
                operation,
                message,
                data: {
                    errorMessage: error.message,
                    stack: error.stack,
                    code: error.code
                },
                userId: userId || null
            });
            await Log.save(logEntry);
        } catch (logError) {
            console.error("CRITICAL: Fallo al guardar en el sistema de logs (ERROR).", logError);
        }
    }
    public static async logWarning(operation: string, message: string, data?: object, userId?: number): Promise<void> {
        try {
            const logEntry = Log.create({
                level: LogLevel.WARN,
                operation,
                message,
                data,
                userId: userId || null
            });
            await Log.save(logEntry);
        } catch (logError) {
            console.error("CRITICAL: Fallo al guardar en el sistema de logs (WARN).", logError);
        }
    }
}