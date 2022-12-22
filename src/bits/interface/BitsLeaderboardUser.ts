export interface BitsLeaderboardUser {
  user_id: string;
  user_login: string;
  user_name: string;
  rank: number;
  score: number;
  started_at?: string;
  ended_at?: string;
}
