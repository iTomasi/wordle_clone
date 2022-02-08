import { Handler } from "express";

// Helpers
import { name_RegExp, username_RegExp, email_RegExp, password_RegExp } from "../helpers/customRegExp";

export const POST_signUpEmail: Handler = (req, res) => {
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

    res.json({ message: "OK" })
}