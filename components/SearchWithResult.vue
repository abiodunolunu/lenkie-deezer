<script setup lang="ts">
import type { SearchArtistResponse } from "@/types/apiResponse/artist.response";
import { SearchType } from "@/types/enums/SearchType";
import { useQuery } from "@tanstack/vue-query";
import type { Artist } from "~/types/models/artist.model";
const { $api } = useNuxtApp();
const router = useRouter();

const searchTerm = ref("");
const debouncedSearchTerm = debouncedValue(searchTerm, 600);
const isSearching = computed(() => searchTerm.value.trim() !== "");

const { data: searchResult } = useQuery({
  queryKey: ["search-artist", debouncedSearchTerm],
  queryFn: () =>
    $api.general.findData<SearchArtistResponse>(
      debouncedSearchTerm.value,
      SearchType.ARTIST
    ),
  enabled: () => debouncedSearchTerm.value !== "",
  select(data) {
    return data.data;
  },
});

function goToArtistPage(artist: Artist) {
  searchTerm.value = "";
  router.push(`/artists/${artist.id}`);
}
</script>

<template>
  <div class="relative">
    <BaseInput
      :input-props="{ type: 'search', placeholder: 'Search Artist' }"
      :class="{
        'rounded-b-none': isSearching,
      }"
      v-model="searchTerm"
    >
      <template #leftIcon>
        <IconsSearch class="h-6 w-6" />
      </template>
    </BaseInput>

    <template v-if="isSearching">
      <div
        class="bg-[#000] py-4 px-4 rounded-md rounded-t-none absolute left-0 right-0 top-12 border border-grey border-opacity-30 max-h-80 overflow-auto"
      >
        <template v-if="searchResult && searchResult.length > 0">
          <div class="grid gap-4">
            <SingleArtistMiniCard
              @click="goToArtistPage(artist)"
              role="button"
              :avatar-size="'sm'"
              :artist="artist"
              v-for="artist in searchResult"
              :key="artist.id"
            />
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<style></style>
