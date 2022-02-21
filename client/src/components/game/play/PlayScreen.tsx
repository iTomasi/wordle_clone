import React from "react";
import { LinksFunction } from "remix";

// Components
import { Wordle } from "../../wordle/Wordle";

// Css
import playScreenCss from "~/css/components/game/play/playScreen.css";

interface IStorage {
    word: string;
    evaluation: number[]
}

interface IPlayScreenProps {
    id: number;
    wordLength: number;
    trys: number;
    description: string;
    storage: IStorage[];
    setStorage: (value: IStorage[] | ((prev: IStorage[]) => IStorage[])) => void;
}

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: playScreenCss }
    ]
}

export const PlayScreen = ({ id, wordLength, trys, description, storage, setStorage }: IPlayScreenProps) => {
    return (
        <div className="iw_playScreen">

            <h3 className="iw_description mb-4">{description}</h3>

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