export interface Artist {
  id: string;
  name: string;
  link: string;
  share: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  nb_album: number;
  nb_fan: number;
  radio: boolean;
  tracklist: string;
  type: "artist";
}

export type Contributor = Omit<Artist, "nb_album" | "nb_fan"> & {
  role: string;
};

export type ChartingArtist = Artist & {
  position: number;
};
