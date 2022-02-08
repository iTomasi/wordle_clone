import { Handler } from "express";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Helpers
import { name_RegExp, username_RegExp, email_RegExp, password_RegExp } from "../helpers/customRegExp";
import clearUserData from "../helpers/clearUserData";

// Models
import Account from "../models/Account";

// Config
import globalsCfg from "../config/globals";

export const POST_signUpEmail: Handler = async (req, res) => {
    const { name, username, email, password, confirm_password } = req.body;

    if (!name || typeof name !== "string") return res.json({ message: "Name is missing", inputName: "name" })
    else if (!username || typeof username !== "string") return res.json({ message: "Username is missing", inputName: "username" })
    else if (!email || typeof email !== "string") return res.json({ message: "Email is missing", inputName: "email" })
    else if (!password || typeof password !== "string") return res.json({ message: "Password is missing", inputName: "password" })
    else if (!confirm_password || typeof confirm_password !== "string") return res.json({ message: "Confirm password is missing", inputName: "confirm_password" })

    if (!name_RegExp.test(name)) return res.json({ message: "Name wrong", inputName: "name" })
    else if (!username_RegExp.test(username)) return res.json({ message: "Wrong username", inputName: "username" })
    else if (!email_RegExp.test(email)) return res.json({ message: "Wrong email, example: wordle@app.com", inputName: "email" })
    else if (!password_RegExp.test(password)) return res.json({ message: "Your password should contains at least 5 characters", inputName: "password" })
    else if (password !== confirm_password) return res.json({ message: "Your passwords not match!", inputName: "confirm_password" })

    try {
        const user = await Account.findOne({
            where: {
                [Op.or]: [
                    { username_lower: username.toLowerCase() },
                    { email: email.toLowerCase() }
                ]
            }
        })

        if (user) {
            if (user.getDataValue("username_lower") === username.toLowerCase()) {
                return res.json({ message: "Username already exists", inputName: "username" })
            }

            else if (user.getDataValue("email") === email.toLowerCase()) {
                return res.json({ message: "Email already taked", inputName: "email" })
            }

            return res.json({ message: "WTF?" })
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt);

        const newUser = await Account.create({
            username,
            username_lower: username.toLowerCase(),
            name,
            name_lower: name.toLowerCase(),
            email: email.toLowerCase(),
            password: hash
        })

        const clearUser = clearUserData(newUser.get());

        const token = jwt.sign(
            { id: clearUser.id },
            globalsCfg.JWT_SECRET,
            { expiresIn: 86400 }
        );

        return res.json({ message: "OK", data: { token, user: clearUser } })
    }

    catch(e) {
        console.log(e);
        console.log("POST_signUpEmail() Error");
        return res.json({ message: "Server Error" })
    }
    
}