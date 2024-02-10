<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
const { $api } = useNuxtApp();

const { data: artistsChart, isLoading } = useQuery({
  queryKey: ["artists-chart"],
  queryFn: () => $api.artist.getChartingArtists(50),
  select(data) {
    return data.data;
  },
});
</script>

<template>
  <div class="container h-full min-h-full">
    <template v-if="artistsChart">
      <div class="mt-10">
        <h1 class="uppercase text-2xl font-bold text-primary italic">
          Trending Artists - Top 50
        </h1>
      </div>
      <template v-if="artistsChart">
        <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SingleArtistMiniCard
            v-for="artist in artistsChart"
            :key="artist.id"
            :artist="artist"
            role="button"
            @click="$router.push(`/artists/${artist.id}`)"
          >
            <span class="text-white text-xs group-hover:text-grey">
              {{ artist.position }}
            </span>
          </SingleArtistMiniCard>
        </div>
      </template>
    </template>
    <template v-if="isLoading">
      <div class="min-h-full flex justify-center items-center">
        <IconsLoader class="h-24 w-24" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
