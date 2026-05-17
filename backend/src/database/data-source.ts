import "reflect-metadata"
import "dotenv/config"

import { DataSource } from "typeorm"

import { User } from "./entities/User"

export const appDataSource = new DataSource({
    type: "postgres",

    host: process.env.DATABASE_HOST,

    port: Number(process.env.DATABASE_PORT),

    username: process.env.DATABASE_USER,

    password: process.env.DATABASE_PASSWORD,

    database: process.env.DATABASE_NAME,

    synchronize: false,

    logging: true,

    entities: [User],

    migrations: ["src/database/migrations/*.ts"]
})