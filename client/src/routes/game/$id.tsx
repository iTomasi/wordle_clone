import React, { useState } from "react";
import { LinksFunction, LoaderFunction, useLoaderData } from "remix";

// Components
import { NavBar, links as navBarLinks } from "~/components/game/NavBar";
import { links as wordleLinks } from "~/components/wordle/Wordle";
import PlayScreen from "~/components/game/play/PlayScreen";
import LeaderboardScreen from "~/components/game/leaderboard/LeaderboardScreen";

// Requests
import { AxiosGetGameById } from "~/requests/localApi/AxiosGame";

// Helpers
import { getCookie } from "~/helpers/handleCookies";

export const links: LinksFunction = () => {
    return [
        ...navBarLinks(),
        ...wordleLinks()
    ]
}

export const loader: LoaderFunction = async ({ params, request }) => {
    const { id } = params;
    
    if (!id) return { error: "Game Id is missing" }

    const userToken = getCookie("token", request.headers.get("cookie") || "")

    const getGame = await AxiosGetGameById(id, !userToken ? "" : userToken)

    return getGame
}

const GameId = () => {
    const { error, data } = useLoaderData();
    const [nav, setNav] = useState<string>("play");

    if (error) return <h1>{error}</h1>

    console.log(data)
    return (
        <div>
            <NavBar
                className="mb-8"
                nav={nav}
                setNav={setNav}
            />
            
            {
                nav === "play" && (
                    <PlayScreen
                        id={data.id}
                        wordLength={data.wordLength}
                        trys={data.trys}
                    />
                )
            }
            
            {
                nav === "leaderboard" && <LeaderboardScreen/>
            }
        </div>
    )
};

export default GameId;