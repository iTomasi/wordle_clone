import React from "react";
import { LinksFunction } from "remix";

// Components
import { UserPicture } from "../../user/UserPicture";

// css
import cardCss from "~/css/components/game/leaderboard/card.css";

interface ICardProps {
  username: string;
  profile_picture: string;
  trys: number;
  active: boolean;
}

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: cardCss }
  ]
}

export const Card = ({ username, profile_picture, trys, active }: ICardProps) => {
  return (
    <div className={`iw_card ${active ? "active" : "noactive"}`}>
      <div className="iw_card-userInfo">
        <UserPicture
          margin="0 0.5rem 0 0"
          profile_picture={profile_picture}
          username={username}
        />

        <span>{username}</span>
      </div>

      <span>{trys}</span>
    </div>
  )
};