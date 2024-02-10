<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { useGlobalEvent } from "~/composables/useEventBus";
import type { Track } from "~/types/models/track.model";

const {
  params: { id },
} = useRoute();
const { $api } = useNuxtApp();

const {
  data: everything,
  isLoading,
  suspense,
  error,
} = useQuery({
  queryKey: ["artist-tracklists", id],
  queryFn: () =>
    Promise.all([
      $api.artist.getArtistById(id as string),
      $api.artist.getArtistTracklist(id as string, 5),
      $api.artist.getArtistAlbums(id as string),
    ]),
  select(data) {
    const [artistData, tracklistData, albumsData] = data;
    return {
      artist: artistData,
      tracks: tracklistData.data,
      albums: albumsData.data,
    };
  },
});

const { setCurrentTrackIndex, currentTrack, isPlaying, setTracks } =
  usePlayer();

function handlePlayTrack(index: number) {
  if (everything.value && everything.value.tracks) {
    setTracks(everything.value.tracks);
    setCurrentTrackIndex(index);
    useGlobalEvent("play:toggle", true);
  }
}

function handlePause() {
  useGlobalEvent("play:toggle", false);
}

function trackIsPlaying(track: Track) {
  return track.id === currentTrack.value?.id && isPlaying.value;
}
</script>

<template>
  <div v-if="isLoading" class="h-full flex justify-center items-center">
    <IconsLoader class="h-24 w-24" />
  </div>

  <div v-else class="py-10">
    <div class="" v-if="everything">
      <div class="px-4 container">
        <div class="grid gap-6 md:grid-cols-2">
          <div class="space-y-4">
            <div>
              <p class="text-3xl font-semibold">{{ everything.artist.name }}</p>
            </div>
            <div class="rounded-sm overflow-hidden flex items-center">
              <img
                :src="everything.artist.picture_big"
                alt=""
                class="shadow-2xl h-[360px] rounded-md"
              />
            </div>
            <div class="text-sm">
              <p>
                Fans:
                <span class="text-grey text-xs">
                  {{ Intl.NumberFormat().format(everything.artist.nb_fan) }}
                </span>
              </p>
              <p>
                Albums:
                <span class="text-grey text-xs">
                  {{ Intl.NumberFormat().format(everything.artist.nb_album) }}
                </span>
              </p>
            </div>
          </div>

          <div>
            <div class="mt-6 space-y-4">
              <p class="uppercase text-2xl font-bold text-primary italic">
                Top Songs
              </p>
              <div class="grid gap-2">
                <TrackItem
                  @play-track="() => handlePlayTrack(idx)"
                  @pause-track="handlePause"
                  :is-playing="trackIsPlaying(track)"
                  v-for="(track, idx) in everything.tracks"
                  :key="track.id"
                  :track="track"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8">
          <div class="space-y-4">
            <p class="uppercase text-2xl font-bold text-primary italic">
              Albums
            </p>
            <div
              class="grid gap-4 justify-between grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(3,1fr)] xl:grid-cols-[repeat(4,1fr)] 2xl:grid-cols-[repeat(5,1fr)]"
            >
              <AlbumPreview
                v-for="album in everything.albums"
                :key="album.id"
                :album="album"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="error"
    class="h-full flex justify-center items-center px-8 font-medium"
  >
    <p class="max-w-sm text-lg">
      {{ error.message }}
    </p>
  </div>
</template>

<style></style>
