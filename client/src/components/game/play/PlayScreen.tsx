import React from "react";

// Components
import { Wordle } from "../../wordle/Wordle";

interface IPlayScreenProps {
    id: number;
    wordLength: number;
    trys: number;
}

const PlayScreen = ({ id, wordLength, trys }: IPlayScreenProps) => {
    return (
        <div>
            <Wordle
                id={id}
                wordLength={wordLength}
                trys={trys}
                storage={[]}
            />
        </div>
    )
};

export default PlayScreen;