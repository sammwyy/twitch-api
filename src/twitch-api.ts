import fetch from 'isomorphic-unfetch';
import { BitsClient } from './bits/bits-client';
import { TwitchAPIException } from './twitch-api-exception';
import { UsersClient } from './users/users-client';
import { jsonToURLEncoded } from './utils';

interface TwitchAPISettings {
  clientId: string;
  accessToken: string;
}

export class TwitchAPI {
  public readonly settings: TwitchAPISettings;

  public readonly bits: BitsClient;
  public readonly users: UsersClient;

  constructor(settings: TwitchAPISettings) {
    this.settings = settings;

    this.bits = new BitsClient(this);
    this.users = new UsersClient(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _endpoint(uri: string, query: Record<string, any> | null = null): string {
    const base = 'https://api.twitch.tv/helix/';
    const queryStr = query ? '?' + jsonToURLEncoded(query) : '';
    return base + uri + queryStr;
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
    const res = await req.json();

    if (res.status && res.message) {
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
    const res = await req.json();

    if (res.status && res.message) {
      throw new TwitchAPIException(res.status, res.message);
    }

    return res;
  }
}
