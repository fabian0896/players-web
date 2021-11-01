import React from "react";
import { PlayerData } from "../../react-app-env";

import PLayerItem from "./PlayerItem";

interface PlayersListProps {
  players: PlayerData[]
}

const PlayersList: React.FC<PlayersListProps> = ({ players }) => {
  return(
    <div className="grid grid-cols-3 gap-8">
      {players.map((player) => (
        <PLayerItem key={player.id} player={player} />
      ))}
    </div>
  );
};

export default PlayersList;
