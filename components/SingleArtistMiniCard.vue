<script setup lang="ts">
import type { Artist, ChartingArtist } from "~/types/models/artist.model";

interface Props {
  artist: Artist | ChartingArtist;
  avatarSize?: "sm" | "lg";
}
const props = withDefaults(defineProps<Props>(), {
  avatarSize: "lg",
});
</script>

<template>
  <div class="flex items-center gap-4 text-grey hover:text-primary group">
    <div
      class="h-16 w-16 rounded-full overflow-hidden"
      :class="[avatarSize === 'lg' ? 'h-16 w-16' : 'h-8 w-8']"
    >
      <img
        class="group-hover:scale-125 duration-200"
        :src="avatarSize === 'lg' ? artist.picture_xl : artist.picture_small"
        alt=""
      />
    </div>
    <slot />
    <div>
      <p class="text-sm font-medium">{{ artist.name }}</p>
    </div>
  </div>
</template>
