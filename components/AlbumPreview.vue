<script setup lang="ts">
import type { Album } from "~/types/models/album.model";

interface Props {
  album: Album;
}
const props = defineProps<Props>();
</script>

<template>
  <div class="w-full">
    <img
      :src="album.cover_xl"
      class="rounded-md aspect-square w-full object-cover bg-purple-500"
      alt=""
    />

    <div class="mt-2">
      <p class="text-sm">{{ album.title }}</p>
    </div>
  </div>
</template>

<style></style>
