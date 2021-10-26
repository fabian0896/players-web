import axios from "axios";
import { PlayerCreate, PLayerResponse } from '../react-app-env';

import config from "../config";


class PlayerService{
  playerData: PlayerCreate;

  constructor(playerData: PlayerCreate) {
    this.playerData = playerData;
  }

  static async getAll(token: string) {
    const { data } = await axios.get<PLayerResponse[]>(`${config.api}/players`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return data;
  }

  async saveWithImage(imageSrc: string, token: string) {
    const { data: file } = await axios.get<Blob>(imageSrc, {
      responseType: 'blob',
    });
    const formData = new FormData();
    formData.append('image', file);
    for(let [key, value] of Object.entries(this.playerData)) {
      if (value instanceof Date) {
        value = value.toISOString();
      }
      formData.append(key, value)
    }
    const { data } = await axios.post<PLayerResponse>(`${config.api}/players/image`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return data;
  }

  async save(token: string) {
    const { data } = await axios.post<PLayerResponse>(`${config.api}/players`, this.playerData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return data;
  }
}

export default PlayerService;
