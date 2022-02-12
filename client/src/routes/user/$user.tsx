import React from "react";
import { LoaderFunction, useLoaderData } from "remix";

export const loader: LoaderFunction = ({ params }) => {
    const { user } = params;

    if (!user) return { status: 0, message: "No user query" }


    return {
        status: 1,
        data: user
    }
}

const UserPublicProfile = () => {
    const { status, message, data } = useLoaderData();

    if (status === 0) return <h3>{message}</h3>
    

    return (
        <div>
            {data} profile
        </div>
    )

};

export default UserPublicProfile;