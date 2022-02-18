import React from "react";
import useSWR from "swr";
import { LinksFunction } from "remix";

// Components
import { GameCard, links as gameCardLinks } from "~/components/home/GameCard";

// Requests
import { AxiosGetGames } from "~/requests/localApi/AxiosGame";

export const links: LinksFunction = () => {
  return [
    ...gameCardLinks()
  ]
}

const Index = () => {
  const { error, data } = useSWR("/api/games", AxiosGetGames);

  if (error === undefined && data === undefined) return <h4>Loading...</h4>

  console.log(data)

  return (
    <div>
      <div>
        {
          data.map((value: any) => (
            <GameCard
              key={value.id}
              id={value.id}
              className="mb-4 last:mb-0"
              username={value.user_data.username}
              profile_picture={value.user_data.profile_picture}
              created_at={value.createdAt}
              description={value.description}
            />
          ))
        }
        
      </div>
    </div>
  )
};


export default Index;