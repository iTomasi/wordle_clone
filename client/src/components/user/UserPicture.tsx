import React from "react";
import { LinksFunction } from "remix";

// Css
import userPictureCss from "~/css/components/user/userPicture.css";

// Hooks
import { useUser } from "~/hooks/useUser";

interface IUserPictureProps {
    margin?: string;
}

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: userPictureCss }
    ]
}

export const UserPicture = ({ margin = "0" }: IUserPictureProps) => {
    const { user } = useUser();

    return (
        <div className="iw_userPicture" style={{ margin }}>
            {
                !user.profile_picture
                    ? user.username[0].toUpperCase()
                    : (
                        <img src={user.profile_picture} alt={`profile picture from ${user.username} wordle clone`}/>
                    )
            }
        </div>
    )
};