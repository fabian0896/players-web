import React from "react";
import { PlayerData } from "../../react-app-env";

import PLayerItem from "./PlayerItem";

interface PlayersListProps {
  players: PlayerData[],
  showEdit: boolean
}

const PlayersList: React.FC<PlayersListProps> = ({ players, showEdit }) => {
  return(
    <div className="grid grid-cols-3 gap-8">
      {players.map((player) => (
        <PLayerItem showEdit={showEdit} key={player.id} player={player} />
      ))}
    </div>
  );
};

export default PlayersList;
