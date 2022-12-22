import dotenv from 'dotenv';
dotenv.config();

import { TwitchAPI } from '../src';

const twitch = new TwitchAPI({
  clientId: process.env['TWITCH_CLIENT_ID'] as string,
  accessToken: process.env['TWITCH_ACCESS_TOKEN'] as string,
});

test('Get logged user', async () => {
  const user = await twitch.users.getUser();
  expect(user.id).toBe(process.env['TWITCH_USER_ID']);
  expect(user.login).toBe(process.env['TWITCH_USERNAME']);
});

test('Get another user', async () => {
  const user = await twitch.users.getUser({ login: 'twitchdev' });
  expect(user.id).toBe('141981764');
});

test('Get users by ids', async () => {
  const user = await twitch.users.getUsers({ ids: ['141981764', '280803646'] });
  expect(user.length).toBe(2);
});

test('Get users by logins', async () => {
  const user = await twitch.users.getUsers({ logins: ['twitchdev', 'sammwy'] });
  expect(user.length).toBe(2);
});
