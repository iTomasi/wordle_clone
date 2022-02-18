import React from "react";
import { LinksFunction, Link } from "remix";

// Components
import { UserPicture } from "../user/UserPicture";

// Css
import gameCardCss from "~/css/components/home/gameCard.css";

// Helpers
import dateFormat from "~/helpers/dateFormat";

interface IGameCardProps {
    className?: string;
    id: number;
    profile_picture: string;
    username: string;
    created_at: string;
    description: string;
}

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: gameCardCss }
    ]
}

export const GameCard = ({ className = "", id, profile_picture, username, created_at, description }: IGameCardProps) => {
    return (
        <Link className={`iw_gameCard ${className}`} to={`/game/${id}`}>
            <div className="iw_gameCard-top">
                <div className="iw_userInfo">
                    <UserPicture
                        username={username}
                        profile_picture={profile_picture}
                        margin="0 0.5rem 0 0"
                    />

                    <h3>{username}</h3>
                </div>

                <h4>{dateFormat(created_at)}</h4>
            </div>

            <p className="iw_textDescription">{description}</p>
        </Link>
    )
}