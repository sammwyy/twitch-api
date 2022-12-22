import { TwitchAPI } from '../twitch-api';
import { BitsLeaderboardUser } from './interface';

interface GetBitsLeaderboardProps {
  count?: number;
  period?: string;
  started_at?: string;
  userr_id?: string;
}

export class BitsClient {
  private readonly api: TwitchAPI;

  constructor(api: TwitchAPI) {
    this.api = api;
  }

  public async getLeaderboard(
    props?: GetBitsLeaderboardProps,
  ): Promise<BitsLeaderboardUser[]> {
    const { data } = await this.api.get(
      'https://api.twitch.tv/helix/bits/leaderboard',
      props,
    );
    return data as BitsLeaderboardUser[];
  }
}
