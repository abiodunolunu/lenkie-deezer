import type { Album } from "../models/album.model";
import type { Artist, ChartingArtist } from "../models/artist.model";
import type { Track } from "../models/track.model";
import type { apiResponse } from "./index.response";

export type GetArtistByIdResponse = Artist;

export type GetArtistTracklistReponse = apiResponse<Track[]> & {
  next: string;
  total: number;
};

export type GetArtistAlbumsReponse = apiResponse<Album[]> & {
  total: number;
};

export type GetChartingArtistsResponse = apiResponse<ChartingArtist[]>;

export type SearchArtistResponse = apiResponse<Artist[]> & {
  next: string;
  total: number;
};
