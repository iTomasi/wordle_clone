import { Handler } from "express";

export const POST_createGame: Handler = (req, res) => {
    console.log(req.body);

    res.json({ message: "OK" })

}