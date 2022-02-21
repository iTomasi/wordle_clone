import React from "react";

interface IBoxProps {
    character: string;
    evaluation: number;
}

const Box = ({ character, evaluation }: IBoxProps) => {
    return (
        <div className={`iw_wordleTableBox ${evaluation === 2 ? "iw_pro" : evaluation === 1 ? "iw_semi-pro" : evaluation === 0 ? "iw_nope" : ""}`}>
            {character}
        </div>
    )
};

export default Box;