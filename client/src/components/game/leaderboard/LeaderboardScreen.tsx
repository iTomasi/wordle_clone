import React from "react";
import { Card } from "./Card";
import { AxiosGetLeaderboardById } from "~/requests/localApi/AxiosGame";
import useSWR from "swr";
import { useUser } from "~/hooks/useUser";

interface ILeaderboardScreenProps {
    id: number;
}

const LeaderboardScreen = ({ id }: ILeaderboardScreenProps) => {
    const { error, data } = useSWR([id.toString()], AxiosGetLeaderboardById);
    const { user } = useUser();

    if (error === undefined && data === undefined) return <h3>Loading...</h3>
    else if (error !== undefined) return <h4>{error.toString()}</h4>

    console.log(data)

    return (
        <div>
            {
                data.map((value: any) => (
                    <Card
                        key={value.user_id}
                        username={value.username}
                        profile_picture={value.profile_picture}
                        trys={value.trys}
                        active={user.id === value.user_id}
                    />
                ))
            }
        </div>
    )
};

export default LeaderboardScreen;