import { TwitchAPI } from '../twitch-api';
import { Emote } from './interface';

export class ChatClient {
  private readonly api: TwitchAPI;

  constructor(api: TwitchAPI) {
    this.api = api;
  }

  public async getEmotes(broadcaster_id?: string): Promise<Emote[]> {
    if (!broadcaster_id) {
      broadcaster_id = (await this.api.getCurrentUser()).id;
    }

    const { data } = await this.api.get('chat/emotes', { broadcaster_id });
    return data as Emote[];
  }

  public async getEmoteSet(emote_set_id: string): Promise<Emote[]> {
    const { data } = await this.api.get('chat/emotes/set', { emote_set_id });
    return data as Emote[];
  }


  public async getGlobalEmotes(): Promise<Emote[]> {
    const { data } = await this.api.get('chat/emotes/global');
    return data as Emote[];
  }
}
