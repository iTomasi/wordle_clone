import React from "react";

interface IBoxProps {
    character: string;
}

const Box = ({ character }: IBoxProps) => {
    return (
        <div className="iw_wordleTableBox">
            {character}
        </div>
    )
};

export default Box;