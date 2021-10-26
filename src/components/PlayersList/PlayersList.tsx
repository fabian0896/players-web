import React from "react";
import { PLayerResponse } from "../../react-app-env";

import PLayerItem from "./PlayerItem";

interface PlayersListProps {
  players: PLayerResponse[]
}

const PlayersList: React.FC<PlayersListProps> = ({ players }) => {
  return(
    <div className="grid grid-cols-3 gap-5">
      {players.map((player) => (
        <PLayerItem key={player.id} player={player} />
      ))}
    </div>
  );
};

export default PlayersList;
