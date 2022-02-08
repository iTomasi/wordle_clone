import { Sequelize } from "sequelize";
import pg from "pg"
import databasesCfg from "../config/databases";

const { POSTGRES: { HOST, DB_NAME, PORT, USERNAME, PASSWORD } } = databasesCfg;

const POSTGRES_URI = `postgresql://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}`;

const postgres = new Sequelize(POSTGRES_URI, {
    dialect: "postgres",
    dialectModule: pg,
    logging: false
});

export default postgres