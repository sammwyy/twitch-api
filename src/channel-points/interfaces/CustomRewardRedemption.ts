type CustomRewardRedemptionStatus = 'CANCELED' | 'FULFILLED' | 'UNFULFILLED';

export interface CustomRewardRedemption {
  broadcaster_name: string;
  broadcaster_login: string;
  broadcaster_id: string;
  id: string;
  user_login: string;
  user_id: string;
  user_name: string;
  user_input: string;
  status: CustomRewardRedemptionStatus;
  redeemed_at: string;
}
