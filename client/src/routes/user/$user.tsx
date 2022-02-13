import React from "react";
import { LoaderFunction, useLoaderData } from "remix";

// Requests
import { AxiosGetUser } from "~/requests/localApi/AxiosUser";

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
        <div>
            {data.username} profile
        </div>
    )

};

export default UserPublicProfile;