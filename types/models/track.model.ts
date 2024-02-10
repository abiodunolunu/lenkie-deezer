import type { Album } from "./album.model";
import type { Artist, Contributor } from "./artist.model";

export interface Track {
  id: string;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  isrc: string;
  link: string;
  share: string;
  duration: string;
  track_position: number;
  disk_number: number;
  rank: string;
  release_date: Date;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  bpm: number;
  gain: number;
  available_countries: string[];
  contributors: Contributor[];
  md5_image: string;
  artist: TrackArtist;
  album: TrackAlbum;
  type: string;
}

type TrackArtist = Omit<Artist, "nb_album" | "nb_fan">;
type TrackAlbum = Pick<
  Album,
  | "id"
  | "title"
  | "link"
  | "cover"
  | "cover_small"
  | "cover_medium"
  | "cover_big"
  | "cover_xl"
  | "md5_image"
  | "release_date"
  | "tracklist"
  | "type"
>;
