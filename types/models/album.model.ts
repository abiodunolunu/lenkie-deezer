import type { Artist, Contributor } from "./artist.model";
import type { Genre } from "./genre.model";
import type { Track } from "./track.model";

export interface Album {
  id: string;
  title: string;
  upc: string;
  link: string;
  share: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  genre_id: number;
  genres: {
    data: AlbumGenre[];
  };
  label: string;
  nb_tracks: number;
  duration: number;
  fans: number;
  release_date: Date;
  record_type: "album";
  available: boolean;
  tracklist: string;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  contributors: Contributor[];
  artist: AlbumArtist;
  type: "album";
  tracks: { data: AlbumTrack[] };
}

type AlbumTrack = Omit<
  Track,
  | "isrc"
  | "share"
  | "track_position"
  | "disk_number"
  | "release_date"
  | "bpm"
  | "gain"
  | "available_countries"
  | "contributors"
>;

type AlbumArtist = Omit<
  Artist,
  "link" | "share" | "nb_fan" | "nb_album" | "radio"
>;

type AlbumGenre = Pick<Genre, "id" | "name" | "picture" | "type">;
