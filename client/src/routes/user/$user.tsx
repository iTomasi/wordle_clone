import React from "react";
import { LoaderFunction, useLoaderData, LinksFunction } from "remix";

// Components
import { UserPicture } from "~/components/user/UserPicture";

// Requests
import { AxiosGetUser } from "~/requests/localApi/AxiosUser";

// Css
import userCss from "~/css/pages/user/user.css";

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: userCss }
    ]
}

export const loader: LoaderFunction = async ({ params }) => {
    const { user } = params;

    if (!user) return { status: 0, message: "No user query" }

    const { error, data } = await AxiosGetUser(user);

    if (error) return { status: 0, message: error }

    return {
        status: 1,
        data
    }
}

const UserPublicProfile = () => {
    const { status, message, data } = useLoaderData();

    if (status === 0) return <h3>{message}</h3>

    console.log(data)

    return (
        <div className="iw_publicProfile">
            <div className="iw_picture">
                <UserPicture
                    username={data.username}
                    profile_picture={data.profile_picture}
                    size="xl"
                />
            </div>

            <h1>{data.username}</h1>
        </div>
    )

};

export default UserPublicProfile;