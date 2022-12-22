import dotenv from 'dotenv';
dotenv.config();

import { TwitchAPI } from '../src';

const twitch = new TwitchAPI({
  clientId: process.env['TWITCH_CLIENT_ID'] as string,
  accessToken: process.env['TWITCH_ACCESS_TOKEN'] as string,
});

describe('CRUD operations for Custom Rewards', () => {
  let id = '';

  test('Create reward', async () => {
    const reward = await twitch.channelpoints.createCustomReward({
      title: 'Hello World',
      cost: 999999,
    });

    id = reward.id;

    expect(reward).not.toBeNull();
    expect(reward?.id).not.toBeNull();
  });

  test('Get reward', async () => {
    const reward = await twitch.channelpoints.getCustomReward(id);
    expect(reward).not.toBeNull();
    expect(reward?.id).toBe(id);
  });

  test('Delete reward', async () => {
    const deleted = await twitch.channelpoints.deleteCustomReward(id);
    expect(deleted).toBeTruthy();
  });
});
