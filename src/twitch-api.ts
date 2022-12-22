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
  private readonly settings: TwitchAPISettings;

  public readonly bits: BitsClient;
  public readonly users: UsersClient;

  constructor(settings: TwitchAPISettings) {
    this.settings = settings;

    this.bits = new BitsClient(this);
    this.users = new UsersClient(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async get(url: string, query: Record<string, any> | null = null) {
    const finalURL = url + (query ? '?' + jsonToURLEncoded(query) : '');
    const req = await fetch(finalURL, {
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
}
