import "./initDotenv";
import { app, server } from "./app";
import postgres from "./databases/postgres";

(async () => {
    try {
        await postgres.authenticate();
        await postgres.sync({ alter: true });

        console.log("Postgres connected!");

        server.listen(
            app.get("port"),
            () => console.log(`SV ON PORT ${app.get("port")}`)
        )
    }

    catch(e) {
        console.log(e);
        console.log("Init server error() index.ts")
    }
})()