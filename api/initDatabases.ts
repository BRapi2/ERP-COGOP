import { AppDataSource, AppDataSource2 } from "./src/db";

export async function initializeDatabases() {
    try {
        await AppDataSource.initialize();
        await AppDataSource2.initialize();
        console.log("Conexiones a bases de datos establecidas");
    } catch (error) {
        console.error("Error al conectar a las bases de datos:", error);
        throw error;
    }
}