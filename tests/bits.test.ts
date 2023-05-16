import { TwitchAPI } from '../src';

const twitch = new TwitchAPI({
  clientId: process.env['TWITCH_CLIENT_ID'] as string,
  accessToken: process.env['TWITCH_ACCESS_TOKEN'] as string,
});

test('Get bits leaderboard', async () => {
  const leaderboard = await twitch.bits.getLeaderboard({ count: 5 });
  expect(leaderboard.length).toBeGreaterThanOrEqual(5);
});
