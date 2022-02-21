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
    theWord: string;
    setTheWord: (value: string | ((prev: string) => string)) => void;
    loading: boolean;
}

const alphabet: string = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz";

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: tableCss }
    ]
}

export const Table = ({ wordLength, trys, storage, onSubmit, theWord, setTheWord, loading }: ITableProps) => {
    useEffect(() => {
        const handleOnKeyUp = (e: KeyboardEvent) => {
            if (loading || storage.length === trys || (storage[0] !== undefined && storage[storage.length - 1].evaluation.every((value) => value === 2))) return

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
    }, [theWord, loading])

    return (
        <div className="iw_wordleTable">
            {
                Array.from(Array(trys).keys()).map((_, index) => (
                    <div key={index} className="iw_wordleTable-row">
                        {
                            Array.from(Array(wordLength).keys()).map((_, index_1) => (
                                <Box
                                    key={index_1}
                                    evaluation={storage[index] === undefined ? -1 : storage[index].evaluation[index_1]}
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