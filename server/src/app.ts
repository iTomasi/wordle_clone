import express from "express";
import { createServer } from "http";
import cors from "cors";
import routeIndex from "./routes/index.routes";

const app = express();
const server = createServer(app);

app.set("port", process.env.PORT || 4000);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    return res.json({
        message: "Api on"
    })
});

app.use("/api", routeIndex);

export { app, server }