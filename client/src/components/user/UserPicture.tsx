import React from "react";
import { LinksFunction } from "remix";

// Css
import userPictureCss from "~/css/components/user/userPicture.css";

interface IUserPictureProps {
    profile_picture: string;
    username: string;
    margin?: string;
    size?: "normal" | "xl"
}

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: userPictureCss }
    ]
}

export const UserPicture = ({ profile_picture, username, margin = "0", size = "normal" }: IUserPictureProps) => {
    return (
        <div className={`iw_userPicture iw_${size}`} style={{ margin }}>
            {
                !profile_picture
                    ? username[0].toUpperCase()
                    : (
                        <img src={profile_picture} alt={`profile picture from ${username} wordle clone`}/>
                    )
            }
        </div>
    )
};