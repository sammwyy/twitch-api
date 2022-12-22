import { TwitchAPI } from '../twitch-api';
import { TwitchAPIException } from '../twitch-api-exception';
import { CustomReward } from './interfaces';

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

  public async createCustomReward(
    props: CreateCustomRewardProps,
  ): Promise<CustomReward> {
    const broadcaster_id = (await this.api.getUser()).id;
    const { data } = await this.api.post(
      'channel_points/custom_rewards',
      { broadcaster_id },
      props,
    );
    return data[0] as CustomReward;
  }

  public async deleteCustomReward(id: string): Promise<boolean> {
    const broadcaster_id = (await this.api.getUser()).id;
    await this.api.delete('channel_points/custom_rewards', {
      broadcaster_id,
      id,
    });
    return true;
  }

  public async getCustomReward(id: string): Promise<CustomReward | null> {
    const broadcaster_id = (await this.api.getUser()).id;

    const reward = await this.api
      .get('channel_points/custom_rewards', {
        broadcaster_id,
        id,
      })
      .catch((e: TwitchAPIException) => {
        if (e.getStatusCode() == 404) return null;
        throw e;
      });

    return reward?.data[0] as CustomReward | null;
  }

  public async getCustomRewards(
    only_manageable_rewards = false,
  ): Promise<CustomReward[]> {
    const broadcaster_id = (await this.api.getUser()).id;
    const { data } = await this.api.get('channel_points/custom_rewards', {
      broadcaster_id,
      only_manageable_rewards,
    });
    return data as CustomReward[];
  }
}
