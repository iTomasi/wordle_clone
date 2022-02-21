import React from "react";
import { LinksFunction } from "remix";

// Components
import { Table, links as tableLinks } from "./Table";

// Css
import wordleCss from "~/css/components/wordle/wordle.css";

// Requests
import { AxiosVerifyWord } from "~/requests/localApi/AxiosGame";

interface IStorage {
    word: string;
    evaluation: number[]
}

interface IWordleProps {
    id: number;
    wordLength: number;
    trys: number;
    storage: IStorage[];
}

// Evaluation = { "0": "red", "1": "yellow", "2": "green" }
// { word: "pencil", evaluation: [ 0, 1, 2 ] }

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: wordleCss },
        ...tableLinks()
    ]
}

export const Wordle = ({id, wordLength, trys, storage }: IWordleProps) => {
    const handleOnSubmitTable = async (word: string) => {
        const { error, data } = await AxiosVerifyWord({ id, word })

        if (error) {
            console.log(error);
            return
        }
        
        console.log(data)
    }

    return (
        <div className="iw_wordle">
            <Table
                wordLength={wordLength}
                trys={trys}
                storage={storage}
                onSubmit={handleOnSubmitTable}
            />
        </div>
    )
};