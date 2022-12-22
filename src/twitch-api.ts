import fetch from 'isomorphic-unfetch';
import { BitsClient } from './bits/bits-client';
import { ChannelPointsClient } from './channel-points';
import { TwitchAPIException } from './twitch-api-exception';
import { TwitchUser } from './users';
import { UsersClient } from './users/users-client';
import { jsonToURLEncoded } from './utils';

interface TwitchAPISettings {
  clientId: string;
  accessToken: string;
  userId?: string;
}

export class TwitchAPI {
  private readonly settings: TwitchAPISettings;
  private user: TwitchUser | null;

  public readonly bits: BitsClient;
  public readonly channelpoints: ChannelPointsClient;
  public readonly users: UsersClient;

  constructor(settings: TwitchAPISettings) {
    this.settings = settings;
    this.user = null;

    this.bits = new BitsClient(this);
    this.channelpoints = new ChannelPointsClient(this);
    this.users = new UsersClient(this);
  }

  public async getUser(): Promise<TwitchUser> {
    if (!this.user) {
      this.user = await this.users.getUser();
    }

    return this.user;
  }

  public async setUser(user: TwitchUser) {
    this.user = user;
  }

  private _endpoint(
    uri: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query: Record<string, any> | null = null,
  ): string {
    const base = 'https://api.twitch.tv/helix/';
    const queryStr = query ? '?' + jsonToURLEncoded(query) : '';
    return base + uri + queryStr;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async delete(url: string, query: Record<string, any> | null = null) {
    const req = await fetch(this._endpoint(url, query), {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + this.settings.accessToken,
        'Client-Id': this.settings.clientId,
      },
    });

    const res = await req.json().catch(() => null);
    if (res?.status && res?.message) {
      throw new TwitchAPIException(res.status, res.message);
    }
    return res;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async get(url: string, query: Record<string, any> | null = null) {
    const req = await fetch(this._endpoint(url, query), {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + this.settings.accessToken,
        'Client-Id': this.settings.clientId,
      },
    });

    const res = await req.json().catch(() => null);
    if (res?.status && res?.message) {
      throw new TwitchAPIException(res.status, res.message);
    }
    return res;
  }

  async post(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query: Record<string, any> | null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: Record<string, any> | null = null,
  ) {
    const req = await fetch(this._endpoint(url, query), {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.settings.accessToken,
        'Client-Id': this.settings.clientId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const res = await req.json().catch(() => null);
    if (res?.status && res?.message) {
      throw new TwitchAPIException(res.status, res.message);
    }
    return res;
  }
}
