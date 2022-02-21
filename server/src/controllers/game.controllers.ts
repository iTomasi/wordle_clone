import { Handler } from "express";

// Helpers
import { word_RegExp, trys_RegExp } from "../helpers/customRegExp";

// Models
import Word from "../models/Word";
import Account from "../models/Account";

export const GET_gameById: Handler = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.json({ message: "Id is missing" })

    try {
        const word = await Word.scope("game_by_id").findOne({
            where: {
                id
            }
        });

        if (!word) return res.json({ message: "Game word not found" })

        const allUsers = await Account.scope("private_data").findAll();

        const findUser = allUsers.find((user) => user.getDataValue("id") === word.getDataValue("user_id"));

        if (!findUser) return res.json({ message: "User owner not found" })

        const getWord = word.get();

        getWord.user_data = findUser.get();
        getWord.wordLength = getWord.word.length;
        delete getWord.word;

        return res.json({ message: "OK", data: getWord })

    }

    catch(e) {
        console.log(e);
        console.log("GET_gameById() Error");
        return res.json({ message: "Server Internal Error" })
    }
}

export const GET_games: Handler = async (req, res) => {
    try {
        const getAllWords = await Word.findAll({
            include: {
                model: Account,
                as: "user_data"
            }
        })

        res.json({ message: "OK", data: getAllWords })
    }

    catch(e) {
        console.log(e);
        console.log("GET_games() Error");
        return res.json({ message: "Server Error" })
    }
}

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

export const POST_verifyWord: Handler = async (req, res) => {
    const { id, word } = req.body;

    if (!id || typeof id !== "number") return res.json({ message: "Id is missing" })
    else if (!word || typeof word !== "string") return res.json({ message: "Word is missing" })

    try {
        const theWord = await Word.findOne({
            where: {
                id
            }
        });

        if (!theWord) return res.json({ message: "Word not found" });
        else if (theWord.getDataValue("word").length !== word.length) return res.json({ message: `Your word need to have ${theWord.getDataValue("word").length} characters` })

        const userDb = req.user;
        const wordUsers: any[] = theWord.getDataValue("users");
        const wordLower: string = word.toLowerCase();
        const wordLowerModel: string = theWord.getDataValue("word_lower")
        const evaluation: number[] = []

        for (let i = 0; i < wordLowerModel.length; i++) {
            const characterModel: string = wordLowerModel[i];
            const character: string = wordLower[i];

            if (characterModel === character) {
                evaluation.push(2)
                continue
            }

            else if (wordLowerModel.includes(character)) {
                evaluation.push(1)
                continue
            }
            
            evaluation.push(0)
        }

        const payloadWord = {
            word: wordLower,
            evaluation
        }

        const findIndex = wordUsers.findIndex((value) => value.user_id === userDb.id);

        if (findIndex === -1) {
            wordUsers.push({
                user_id: userDb.id,
                data: [payloadWord]
            })
        }

        else if (
            wordUsers[findIndex].data.length === theWord.getDataValue("trys") ||
            wordUsers[findIndex].data[wordUsers[findIndex].data.length - 1].word === wordLowerModel
        ) {
            return res.json({ message: "You already played this game!" })
        }

        else {
            wordUsers[findIndex].data.push(payloadWord)
        }
    
        await Word.update({
            users: wordUsers
        }, {
            where: {
                id
            }
        })
        
        res.json({ message: "OK", data: payloadWord })
    }

    catch(e) {
        console.log(e);
        console.log("POST_verifyWord() Error");
        return res.json({ message: "Server Internal Error" })
    }
}