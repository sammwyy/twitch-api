import { TwitchAPI } from '../twitch-api';
import { TwitchUser } from './interfaces/TwitchUser';

interface GetUserProps {
  id?: string;
  login?: string;
}

interface GetUsersProps {
  ids?: string[];
  logins?: string[];
}

export class UsersClient {
  private readonly api: TwitchAPI;

  constructor(api: TwitchAPI) {
    this.api = api;
  }

  public async getUser(props?: GetUserProps): Promise<TwitchUser> {
    const { data } = await this.api.get(
      'https://api.twitch.tv/helix/users',
      props,
    );
    return data[0] as TwitchUser;
  }

  public async getUsers(props: GetUsersProps): Promise<TwitchUser[]> {
    const ids = props.ids?.map((user) => 'id=' + user).join('&') || '';
    const logins = props.logins?.map((user) => 'login=' + user).join('&') || '';

    const { data } = await this.api.get(
      'https://api.twitch.tv/helix/users?' + ids + logins,
    );
    return data as TwitchUser[];
  }
}
