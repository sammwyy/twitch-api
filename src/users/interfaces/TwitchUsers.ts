type UserType = 'admin' | 'global_mod' | 'staff' | '';
type BroadcasterType = 'affiliate' | 'partner' | '';

export interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
  type: UserType;
  broadcaster_type: BroadcasterType;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  email?: string;
  created_at: string;
}
