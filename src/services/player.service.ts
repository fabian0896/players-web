import axios from "axios";
import { PlayerCreate } from '../react-app-env';

import config from "../config";


class PlayerService{
  playerData: PlayerCreate;

  constructor(playerData: PlayerCreate) {
    this.playerData = playerData;
  }

  async save(token: string) {
    const { data } = await axios.post<any>(`${config.api}/players`, this.playerData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return data;
  }
}

export default PlayerService;
