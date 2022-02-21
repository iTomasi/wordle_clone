import React from "react";

// Components
import { Wordle } from "../../wordle/Wordle";

interface IStorage {
    word: string;
    evaluation: number[]
}

interface IPlayScreenProps {
    id: number;
    wordLength: number;
    trys: number;
    storage: IStorage[];
    setStorage: (value: IStorage[] | ((prev: IStorage[]) => IStorage[])) => void;
}

const PlayScreen = ({ id, wordLength, trys, storage, setStorage }: IPlayScreenProps) => {
    console.log(storage)
    return (
        <div>
            <Wordle
                id={id}
                wordLength={wordLength}
                trys={trys}
                storage={storage}
                setStorage={setStorage}
            />
        </div>
    )
};

export default PlayScreen;