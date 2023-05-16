import { TwitchAPI } from '../src';

const twitch = new TwitchAPI({
  clientId: process.env['TWITCH_CLIENT_ID'] as string,
  accessToken: process.env['TWITCH_ACCESS_TOKEN'] as string,
});

test('Get Emotes', async () => {
  const emotes = await twitch.chat.getEmotes(process.env['TWITCH_USER_ID']);
  expect(emotes.find(e => e.name == "sammwyComfy")).toBeTruthy();
});

test('Get Emote Set', async () => {
  const emotes = await twitch.chat.getEmoteSet("301590448");
  expect(emotes.find(e => e.name == "twitchdevPitchfork")).toBeTruthy();
});

test('Get Global Emotes', async () => {
  const emotes = await twitch.chat.getGlobalEmotes();
  expect(emotes.find(e => e.name == "Kappa")).toBeTruthy();
  expect(emotes.find(e => e.name == "LUL")).toBeTruthy();
  expect(emotes.find(e => e.name == "TransgenderPride")).toBeTruthy();
});