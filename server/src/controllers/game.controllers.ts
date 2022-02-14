import { Handler } from "express";

// Helpers
import { word_RegExp, trys_RegExp } from "../helpers/customRegExp";

// Models
import Word from "../models/Word";

export const POST_createGame: Handler = async (req, res) => {
    const { word, trys, description } = req.body;

    if (!word || typeof word !== "string") return res.json({ message: "Word is missing" })
    else if (!trys || typeof trys !== "number") return res.json({ message: "Trys is missing" })

    if (!word_RegExp.test(word) || word.length < 3 || word.length > 45) return res.json({ message: "Your word should contains between 3 - 45 characters" })
    else if (!trys_RegExp.test(trys.toString()) || trys < 1 || trys > 20) return res.json({ message: "Your trys should contains between 1 - 20" })

    try {
        await Word.create({
            user_id: req.user.id,
            word,
            word_lower: word.toLowerCase(),
            trys,
            description: (!description || typeof description !== "string") ? "" : description
        })

        return res.json({ message: "OK" })
    }

    catch(e) {
        console.log(e);
        console.log("POST_createGame() Error");
        return res.json({ message: "Server Error" })
    }

}