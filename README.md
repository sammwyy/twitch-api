# Twitch API

Modern wrapper for the Twitch API with typings.

## 💻 Getting started

```shell
# With npm:
npm install twitch-api-ts

# With yarn:
yarn add twitch-api-ts
```

## 📚 Usage

### As a ES Module

```javascript
import { TwitchAPI } from 'twitch-api-ts';

// Initialize client.
const client = new TwitchOAuth({
  clientId: '..............',
  accessToken: '..........',
});
```

### As CJS Module

```javascript
// If uses require function you will need to use .default
// For import in typescript, this is not required
const { TwitchAPI } = require('twitch-api-ts').default;
```

## 📝 To Do

- Bits:
  - [x] Get bits leaderboard.
  - [ ] Get Cheermotes.
  - [ ] Get Extension Transactions.
- Channels:
  - [ ] Get channel information.
  - [ ] Modify channel information.
  - [ ] Get channel editors.
- Channel Points:
  - [x] Create custom rewards.
  - [x] Get custom rewards.
  - [ ] Get rewards redemptions.
  - [x] Delete custom rewards.
  - [ ] Update custom rewards.
  - [ ] Update redemption status.
- Charity:
  - [ ] Get charity campaign.
  - [ ] Get charity campaign donations.
- Chat:
  - [ ] Get chatters.
  - [x] Get channel emotes.
  - [x] Get global emotes.
  - [x] Get emote sets.
  - [ ] Get channel chat badges.
  - [ ] Get chat settings.
  - [ ] Update chat settings.
  - [ ] Get user chat color.
  - [ ] Update user chat color.
- Clips:
  - [ ] Create clip.
  - [ ] Get clips.
- Entitlements:
  - [ ] Get code status.
  - [ ] Get drrops entitlements.
  - [ ] Update drops entitlements.
  - [ ] Redeem code.
Users:
  - [x] Get users.
And more...

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/sammwyy/twitch-api/issues).

## ❤️ Show your support

Give a ⭐️ if this project helped you!

Or buy me a coffeelatte 🙌🏾

[Ko-fi](https://ko-fi.com/sammwy) | [Patreon](https://patreon.com/sammwy)

## 📝 License

Copyright © 2022 [Sammwy](https://github.com/sammwyy).  
This project is [MIT](LICENSE) licensed.
