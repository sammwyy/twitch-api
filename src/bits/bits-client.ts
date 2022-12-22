import { TwitchAPI } from '../twitch-api';

export class BitsClient {
  private readonly api: TwitchAPI;

  constructor(api: TwitchAPI) {
    this.api = api;
  }
}
