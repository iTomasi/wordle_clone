import React, { useState, useEffect } from "react";
import { LinksFunction } from "remix";

// Components
import Box from "./Box";

// Css
import tableCss from "~/css/components/wordle/table.css";

interface IStorage {
    word: string;
    evaluation: number[];
}

interface ITableProps {
    wordLength: number;
    trys: number;
    storage: IStorage[];
    onSubmit: (word: string) => void;
}

const alphabet: string = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz";

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: tableCss }
    ]
}

export const Table = ({ wordLength, trys, storage, onSubmit }: ITableProps) => {
    const [theWord, setTheWord] = useState<string>("");

    useEffect(() => {
        const handleOnKeyUp = (e: KeyboardEvent) => {
            if (e.key === "Backspace" && theWord) {
                setTheWord((prev) => prev.substring(0, prev.length - 1))
            }

            else if (e.key === "Enter" && theWord.length === wordLength) {
                onSubmit(theWord)
            }

            else if (alphabet.includes(e.key) && theWord.length < wordLength) {
                setTheWord((prev) => prev.concat(e.key))
            }
        }

        window.addEventListener("keyup", handleOnKeyUp);

        return () => window.removeEventListener("keyup", handleOnKeyUp)
    }, [theWord])

    return (
        <div className="iw_wordleTable">
            {
                Array.from(Array(trys).keys()).map((_, index) => (
                    <div key={index} className="iw_wordleTable-row">
                        {
                            Array.from(Array(wordLength).keys()).map((_, index_1) => (
                                <Box
                                    key={index_1}
                                    character={
                                        (storage[index] === undefined && index === storage.length)
                                            ? (!theWord[index_1] ? "" : theWord[index_1])
                                            : storage[index] === undefined
                                                ? ""
                                                : storage[index].word[index_1]
                                    }
                                />
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )

};