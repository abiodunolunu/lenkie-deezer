import { defineStore } from "pinia";
import type { Track } from "~/types/models/track.model";

export const useTracksStore = defineStore("tracks", () => {
  const tracks = ref<Track[]>([]);

  return { tracks };
});
