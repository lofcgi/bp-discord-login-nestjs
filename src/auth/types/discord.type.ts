export interface DiscordTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

export interface DiscordProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
}
