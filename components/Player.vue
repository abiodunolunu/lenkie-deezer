<script setup lang="ts">
import { convertSeconds } from "@/utils/functions";
import { useGlobalListen } from "~/composables/useEventBus";
const indicatorRef = ref<HTMLSpanElement>();
const audioRef = ref<HTMLAudioElement>();

const currentTrackDuration = ref(0);
const currentTrackCurrentTime = ref(0);

const {
  currentTrack,
  playNextTrack,
  playPrevTrack,
  isLoading,
  isPlaying,
  setAudioState,
} = usePlayer();

const timeElapsedPercent = computed(() => {
  if (!currentTrackCurrentTime.value || !currentTrackDuration.value) return 0;
  return (currentTrackCurrentTime.value / currentTrackDuration.value) * 100;
});

watch(
  currentTrack,
  (newVal) => {
    const audio = audioRef.value;
    if (!audio) return;
    if (!newVal) return;
    audio.src = newVal.preview;
    audio.load();
    audio.play();
  },
  { immediate: true }
);

function handleInput(e: Event) {
  const audio = audioRef.value;
  if (!audio) return;
  const target = e.target as HTMLInputElement;
  const value = +target.value;

  const time = (value / 100) * currentTrackDuration.value;
  audio.currentTime = time;
}

function togglePlayPause() {
  if (isPlaying.value) {
    pause();
  } else {
    play();
  }
}

function play() {
  const audio = audioRef.value!;
  audio.play();
  setAudioState({ isPlaying: true });
}

function pause() {
  const audio = audioRef.value!;
  audio.pause();
  setAudioState({ isPlaying: false });
}

function handlePlayEvent() {
  setAudioState({ isPlaying: true });
}

function handlePauseEvent() {
  setAudioState({ isPlaying: false });
}

function handleEndedEvent() {
  playNextTrack();
}

function handlePlayingEvent() {
  setAudioState({ isLoading: false });
}

function handleTimeUpdateEvent() {
  const audio = audioRef.value!;
  currentTrackDuration.value = audio.duration;
  currentTrackCurrentTime.value = audio.currentTime;
}

function handleWaitingEvent() {
  setAudioState({ isLoading: true });
}

useGlobalListen("togglePlay", (value) => {
  if (value) {
    play();
  } else {
    pause();
  }
});
</script>

<template>
  <div class="">
    <div class="progress relative">
      <input
        type="range"
        min="0"
        max="100"
        class="slider absolute left-0 top-0 w-full"
        id="myRange"
        :value="timeElapsedPercent"
        @input="handleInput"
      />
      <span
        ref="indicatorRef"
        class="progress-indicator bg-primary absolute top-0 left-0 h-full w-24 pointer-events-none"
        :style="{ width: timeElapsedPercent + '%', willChange: 'width' }"
      />
    </div>
    <div
      class="player bg-gradient-to-r from-lightblack to-black py-5 px-8 grid grid-cols-[auto,auto] justify-between gap-4"
    >
      <div class="flex items-center gap-4">
        <div class="player__controls text-white flex items-center gap-5">
          <button class="hover:text-grey" @click="playPrevTrack">
            <IconsPlayerPrev class="h-4 w-4" />
          </button>
          <button class="hover:text-grey" @click="togglePlayPause">
            <template v-if="!isLoading">
              <IconsPlayerPause class="h-7 w-7" v-if="isPlaying" />
              <IconsPlayerPlay v-else class="h-7 w-7" />
            </template>

            <template v-else>
              <IconsLoader class="h-7 w-7" />
            </template>
          </button>
          <button class="hover:text-grey" @click="playNextTrack">
            <IconsPlayerNext class="h-4 w-4" />
          </button>
        </div>

        <div class="player__time text-xs">
          {{ convertSeconds(currentTrackCurrentTime) }} /
          {{ convertSeconds(currentTrackDuration) }}
        </div>
      </div>

      <div class="flex justify-center">
        <div class="flex items-center gap-2" v-if="currentTrack">
          <div class="rounded-lg overflow-hidden">
            <img :src="currentTrack.album.cover_small" alt="" />
          </div>

          <div>
            <p class="text-white text-sm">{{ currentTrack.artist.name }}</p>
            <p class="text-grey text-xs">{{ currentTrack.title }}</p>
          </div>
        </div>
      </div>

      <audio
        id="audio"
        ref="audioRef"
        @play="handlePlayEvent"
        @pause="handlePauseEvent"
        @ended="handleEndedEvent"
        @timeupdate="handleTimeUpdateEvent"
        @waiting="handleWaitingEvent"
        @playing="handlePlayingEvent"
      >
        <source
          :src="currentTrack ? currentTrack.preview : ''"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  </div>
</template>

<style scoped lang="scss">
.progress {
  height: 4px;
  //   background-color: red;
  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 100%;
    background: #d3d3d3;
    outline: none;
    opacity: 1;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;

    border-radius: 50%;
    cursor: pointer;
    z-index: 20;

    @apply bg-primary;
  }

  .slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    cursor: pointer;
    @apply bg-primary;
  }
}
</style>
