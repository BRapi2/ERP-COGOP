import { DataSource } from 'typeorm'
import { entitiesGenerales } from './models/core/entities_generales';
import { entitiesReportes } from './models/reportes/entites_reportes';
import { entitiesContador } from './models/contador/entities_contador';


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "manuel12345",
    database: "bdprueba_erp",
    synchronize: false,
    logging: false,
    ssl: {
        rejectUnauthorized: false
    },
    entities: [...entitiesGenerales, ...entitiesReportes],
    subscribers: [],
    migrations: [],
})

export const AppDataSource2 = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "manuel12345",
    database: "bdprueba",
    synchronize: false,
    logging: false,
    ssl: {
        rejectUnauthorized: false
    },
    entities: [...entitiesContador],
    subscribers: [],
    migrations: [],
})