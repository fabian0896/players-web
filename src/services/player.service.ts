import axios from "axios";
import { PlayerCreate, PlayerData, PlayerResponse } from '../react-app-env';

import config from "../config";


class PlayerService{
  playerData: PlayerCreate;

  constructor(playerData: PlayerCreate) {
    this.playerData = playerData;
  }

  static async getAll(token: string | null, cursor?: number, query?: string) {
    if (!query) {
      query = undefined;
    }
    const { data } = await axios.get<PlayerResponse>(`${config.api}/players`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: {
        cursor,
        query,
        size: 15
      }
    });
    return data;
  }

  static async getById(id: number, token: string | null) {
    const { data: response } = await axios.get<{ data: PlayerData}>(`${config.api}/players/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
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
      if (typeof value === 'boolean') {
        value = String(value);
      }
      formData.append(key, value)
    }
    const { data } = await axios.post<PlayerResponse>(`${config.api}/players/image`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return data;
  }

  async save(token: string) {
    const { data } = await axios.post<PlayerResponse>(`${config.api}/players`, this.playerData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return data;
  }

  static async update(id: number, playerData: Partial<PlayerCreate>, token: string | null) {
    const { data } = await axios.patch<PlayerResponse>(`${config.api}/players/${id}`, playerData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return data;
  }

  static async updateWithImage(id: number, playerData: Partial<PlayerCreate>, imageSrc: string, token: string | null) {
    const file = await this.getBlob(imageSrc);

    const formData = new FormData();
    formData.append('image', file);

    for (let [key, value] of Object.entries(playerData)) {
      if (value instanceof Date) {
        value = value.toISOString();
      }
      if (typeof value === 'boolean') {
        value = String(value);
      }
      formData.append(key, value);
    }

    const { data } = await axios.patch<PlayerResponse>(`${config.api}/players/${id}/image`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return data;
  }

  static async destroy(id: number, token: string | null) {
    await axios.delete(`${config.api}/players/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  static async generateCarnet(id: number, token: string | null, sendEmail: boolean = false) {
    const { data } = await axios.get<Blob>(`${config.api}/players/${id}/carnet`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: {
        send: sendEmail ? 1 : 0,
      },
      responseType: 'blob',
    });
    return data;
  }

  private static async getBlob(imageSrc: string): Promise<Blob> {
    const { data: file } = await axios.get<Blob>(imageSrc, {
      responseType: 'blob',
    });
    return file;
  }
}

export default PlayerService;
