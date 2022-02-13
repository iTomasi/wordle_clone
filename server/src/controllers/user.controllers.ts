import { Handler } from "express";

// Models
import Account from "../models/Account";

// Helpers
import clearUserData from "../helpers/clearUserData";

export const GET_user: Handler = async (req, res) => {
    const { username } = req.params;

    if (!username) return res.json({ message: "Username params is missing" })

    try {
        const user = await Account.findOne({
            where: {
                username_lower: username.toLowerCase()
            }
        });

        if (!user) return res.json({ message: "User not found :(" })

        const clearUser = clearUserData(user.get());

        return res.json({
            message: "OK",
            data: clearUser
        })
    }

    catch(e) {
        console.log(e);
        console.log("GET_user() Error");
        return res.json({ message: "Server Error" })
    }

    console.log(`${username} - PRO`);

    return res.json({ message: "OK" })
}