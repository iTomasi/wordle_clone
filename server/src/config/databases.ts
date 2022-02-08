const databasesCfg = {
    POSTGRES: {
        HOST: process.env.POSTGRES_HOST || "",
        DB_NAME: process.env.POSTGRES_DB_NAME || "postgres",
        PORT: process.env.POSTGRES_PORT || "5432",
        USERNAME: process.env.POSTGRES_USERNAME || "postgres",
        PASSWORD: process.env.POSTGRES_PASSWORD || "password"
    }
}

export default databasesCfg;