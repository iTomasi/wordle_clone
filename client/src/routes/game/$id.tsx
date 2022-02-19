import React, { useState } from "react";
import { LinksFunction } from "remix";

// Components
import { NavBar, links as navBarLinks } from "~/components/game/NavBar";
import PlayScreen from "~/components/game/play/PlayScreen";
import LeaderboardScreen from "~/components/game/leaderboard/LeaderboardScreen";

export const links: LinksFunction = () => {
    return [
        ...navBarLinks()
    ]
}

const GameId = () => {
    const [nav, setNav] = useState<string>("play");

    return (
        <div>
            <NavBar
                nav={nav}
                setNav={setNav}
            />
            
            {
                nav === "play" && <PlayScreen/>
            }
            
            {
                nav === "leaderboard" && <LeaderboardScreen/>
            }
        </div>
    )
};

export default GameId;