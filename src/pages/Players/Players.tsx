import React, { useEffect, useState } from "react";

import { useAuth } from "../../context/auth";
import { PlayerService } from '../../services';
import { PlayersList } from '../../components';
import { PLayerResponse } from "../../react-app-env";

const Players: React.FC = () => {
  const [players, setPlayers] = useState<PLayerResponse[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    (async () => {
      const resPlayers = await PlayerService.getAll(token!);
      setPlayers(resPlayers);
    })();
  }, [token]);

  return(
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <PlayersList players={players} />
      </div>
    </div>
  );
};

export default Players;