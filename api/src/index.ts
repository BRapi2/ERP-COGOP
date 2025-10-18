import "reflect-metadata"
import { app } from '@azure/functions';
import { registerAllDependencies } from "./dependencias/index";
import { initializeDatabases } from "../initDatabases";

app.setup({
    enableHttpStream: true,
});

initializeDatabases().catch(err => {
    console.error("Error durante la inicialización:", err);
    process.exit(1);
});

registerAllDependencies();

