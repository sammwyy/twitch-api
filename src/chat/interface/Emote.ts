export type EmoteFormat = "static" | "animated";
export type EmoteScale = "1.0" | "2.0" | "3.0";
export type EmoteTheme = "dark" | "light";

export interface Emote {
  id: string;
  name: string;
  images: {
    url_1x: string;
    url_2x: string;
    url_3x: string;
  };
  tier: string;
  emote_type: "bitstier" | "follower" | "subscriptions"
  emote_set_id: string;
  format: EmoteFormat[];
  scale: EmoteScale[];
  theme_mode: EmoteTheme[];
}
