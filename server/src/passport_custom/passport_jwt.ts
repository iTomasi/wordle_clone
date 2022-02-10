import { Handler } from "express";
import jwt from "jsonwebtoken";
import globalsCfg from "../config/globals";

// Models
import Account from "../models/Account";

const passport_jwt: Handler = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.json({ message: "Authorization header is missing" });
    else if (!authorization.startsWith("Bearer ")) return res.json({ message: "Authorization header should start: Bearer <token>" })

    const split = authorization.split(" ");

    try {
        const verify: any = jwt.verify(split[1].trim(), globalsCfg.JWT_SECRET);

        const user = await Account.findOne({
            where: {
                id: verify.id
            }
        });

        if (!user) return res.json({ message: "User not found" })

        req.user = user.get();

        return next()
    }

    catch(e) {
        console.log(e);
        console.log("passport_jwt() Error");
        return res.json({ message: "No authenticated" })
    }

};

export default passport_jwt;