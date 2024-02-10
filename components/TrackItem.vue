<script setup lang="ts">
import type { Track } from "~/types/models/track.model";

interface Props {
  track: Track;
  isPlaying: boolean;
}

interface Emits {
  (e: "playTrack"): void;
  (e: "pauseTrack"): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function handleClick() {
  if (props.isPlaying) {
    emit("pauseTrack");
  } else {
    emit("playTrack");
  }
}
</script>

<template>
  <div
    class="grid grid-cols-[auto,1fr,auto] items-center gap-4 hover:text-primary"
    :class="[isPlaying ? 'text-primary' : 'text-white']"
  >
    <img :src="track.album.cover_small" class="rounded-sm h-12 w-12" alt="" />
    <p class="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
      {{ track.title }}
    </p>

    <button
      @click="handleClick"
      class="ml-auto flex-shrink-0 h-6 w-6 border border-current rounded-full flex items-center justify-center"
    >
      <IconsPlayerPause class="h-3 w-3" v-if="isPlaying" />
      <IconsPlayerPlay class="h-3 w-3" v-else />
    </button>
  </div>
</template>

<style></style>
