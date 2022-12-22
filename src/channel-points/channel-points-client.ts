import { TwitchAPI } from '../twitch-api';

interface CreateCustomRewardProps {
  title: string;
  cost: number;
  prompt?: string;
  is_enabled?: boolean;
  background_color?: string;
  is_user_input_required?: boolean;
  is_max_per_stream_enabled?: boolean;
  max_per_stream?: number;
  is_max_per_user_per_stream_enabled?: boolean;
  max_per_user_per_stream?: number;
  is_global_cooldown_enabled?: boolean;
  global_cooldown_seconds?: number;
  should_redemptions_skip_request_queue?: boolean;
}

export class ChannelPointsClient {
  private readonly api: TwitchAPI;

  constructor(api: TwitchAPI) {
    this.api = api;
  }

  public async createCustomReward(props: CreateCustomRewardProps) {
    const broadcaster_id = this.api.settings.clientId;
    const { data } = await this.api.post(
      'https://api.twitch.tv/helix/channel_points/custom_rewards',
      { broadcaster_id },
      props,
    );
  }
}
