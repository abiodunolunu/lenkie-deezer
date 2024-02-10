import type { Track } from "~/types/models/track.model";

interface State {
  originalTracks: Track[];
  currentTrackIndex: number | undefined;
  modifiedTracks: Track[];
  isPlaying: boolean;
  isLoading: boolean;
  isShuffled: boolean;
}

const state = reactive<State>({
  isPlaying: false,
  isLoading: false,
  originalTracks: [],
  modifiedTracks: [],
  currentTrackIndex: undefined,
  isShuffled: false,
});

function shuffleTracks() {
  const { currentTrackIndex, originalTracks: tracks } = state;
  const copiedTracks = [...tracks];

  if (currentTrackIndex != undefined) {
    copiedTracks.splice(currentTrackIndex, 1);
  }

  const shuffled = shuffle<Track>(copiedTracks);

  if (currentTrackIndex != undefined) {
    shuffled.splice(currentTrackIndex, 0, tracks[currentTrackIndex]);
  }

  return shuffled;
}

watch(
  () => state.isShuffled,
  (newVal) => {
    if (!newVal) {
      state.modifiedTracks = state.originalTracks;
      return;
    }

    //I want to shuffle the tracks, i will remove the current track from the array so i can insert it back to it original position after the shuffle

    state.modifiedTracks = shuffleTracks();
  },
  { immediate: true }
);

export const usePlayer = () => {
  const utils = {
    playNextTrack() {
      if (state.currentTrackIndex !== undefined) {
        const isLast =
          state.currentTrackIndex === state.originalTracks.length - 1;
        const indexOfNextTrack = isLast ? 0 : state.currentTrackIndex + 1;
        state.currentTrackIndex = indexOfNextTrack;
      }
    },

    playPrevTrack() {
      if (
        state.currentTrackIndex !== undefined &&
        state.currentTrackIndex > 0
      ) {
        state.currentTrackIndex = state.currentTrackIndex - 1;
      }
    },

    setTracks(tracks: Track[]) {
      state.originalTracks = tracks;
    },

    setCurrentTrackIndex(index: number) {
      state.currentTrackIndex = index;
    },

    setAudioState(obj: Partial<Pick<State, "isLoading" | "isPlaying">>) {
      state.isLoading = obj.isLoading ?? state.isLoading;
      state.isPlaying = obj.isPlaying ?? state.isPlaying;
    },
  };

  const currentTrack = computed(() => {
    if (state.currentTrackIndex === undefined) return;
    if (state.originalTracks.length < 1) return;
    return state.originalTracks[state.currentTrackIndex];
  });

  return {
    ...utils,
    currentTrack,
    isPlaying: computed(() => state.isPlaying),
    isLoading: computed(() => state.isLoading),
    tracks: computed(() => state.originalTracks),
    // modifiedTracks: computed(() => state.modifiedTracks),
  };
};
