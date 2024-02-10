import { type $Fetch } from "ofetch";
import type {
  GetArtistAlbumsReponse,
  GetArtistTracklistReponse,
  GetChartingArtistsResponse,
} from "~/types/apiResponse/artist.response";
import { FetchMethod } from "~/types/enums/FetchMethods";
import type { Artist } from "~/types/models/artist.model";

export const artist = (fetcher: $Fetch) => {
  return {
    getArtistById(artistId: string) {
      return fetcher<Artist>(`/artist/${artistId}`, {
        method: FetchMethod.GET,
      });
    },

    getArtistTracklist(artistId: string, limit: number = 50) {
      return fetcher<GetArtistTracklistReponse>(
        `/artist/${artistId}/top?limit=${limit}`
      );
    },

    getArtistAlbums(artistId: string) {
      return fetcher<GetArtistAlbumsReponse>(`/artist/${artistId}/albums`);
    },

    getChartingArtists(limit: number = 50) {
      return fetcher<GetChartingArtistsResponse>(
        `/chart/0/artists?limit=${limit}`
      );
    },
  };
};
