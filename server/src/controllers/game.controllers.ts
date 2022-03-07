import { Handler } from "express";
import jwt from "jsonwebtoken";

// Helpers
import { word_RegExp, trys_RegExp } from "../helpers/customRegExp";

// Models
import Word from "../models/Word";
import Account from "../models/Account";

// Config
import globalsCfg from "../config/globals";

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

        const userToken = req.headers.authorization;
        let userJwtId: number = 0;

        if (userToken) {
            try {
                const verify: any = jwt.verify(userToken, globalsCfg.JWT_SECRET)

                userJwtId = verify.id
            }

            catch(e) {}
        }

        const getWord = word.get();
        const storage: any[] = []

        getWord.user_data = findUser.get();
        getWord.wordLength = getWord.word.length;
        getWord.users = getWord.users.map((user: any) => {
            if (userJwtId && userJwtId === user.user_id) {
                storage.push(...user.data)
            }

            if (user.data[0] === undefined || user.data[user.data.length - 1].word !== word.getDataValue("word_lower")) return false

            const find = allUsers.find((value) => value.getDataValue("id") === user.user_id);

            if (!find) return false

            return {
                trys: user.data.length,
                ...find.get()
            }
        }).filter(Boolean)
        delete getWord.word;

        return res.json({ message: "OK", data: {...getWord, storage} })
    }

    catch(e) {
        console.log(e);
        console.log("GET_gameById() Error");
        return res.json({ message: "Server Internal Error" })
    }
}

export const GET_games: Handler = async (req, res) => {
    try {
        const getAllWords: any = await Word.findAll({
            include: {
                model: Account,
                as: "user_data"
            },
        });

        getAllWords.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

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

export const GET_gameLeaderboardById: Handler = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.json({ message: "Id is missing" })

    try {
        const word = await Word.findOne({
            where: {
                id
            }
        });

        if (!word) return res.json({ message: "Word game not found" })

        const users = word.getDataValue("users");

        if (users[0] === undefined) return res.json({ message: "OK", data: [] })

        const allUsers = await Account.findAll();

        const userDb = req.user;

        const filter = users.filter((value: any) => {
            if (value.user_id === word.getDataValue("user_id")) return false

            const some = value.data.some((value_0: any) => {
                return value_0.evaluation.every((value_1: number) => value_1 === 2)
            });

            return some
        });

        const map = filter.map((value: any) => {
            const findUser = allUsers.find((user) => user.getDataValue("id") === value.user_id);

            if (!findUser) return false

            return {
                user_id: value.user_id,
                username: findUser.getDataValue("username"),
                profile_picture: findUser.getDataValue("profile_picture"),
                trys: value.data.length,
            }
        });

        const filter_1 = map.filter(Boolean);

        filter_1.sort((a: any, b: any) => a.trys - b.trys)


        return res.json({ message: "OK", data: filter_1 })
    }

    catch(e) {
        console.log(e);
        console.log("GET_gameLeaderboardById() Error");
        return res.json({ message: "Server Internal Error" })
    }

}