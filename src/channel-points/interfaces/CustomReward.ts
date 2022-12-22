import { Image } from '../../';

export interface CustomReward {
  broadcaster_id: string;
  broadcaster_login: string;
  broadcaster_name: string;
  id: string;
  title: string;
  prompt: string;
  cost: number;
  image: Image;
}
