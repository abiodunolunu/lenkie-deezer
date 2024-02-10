<script setup lang="ts">
const { currentTrack } = usePlayer();
import { vOnClickOutside } from "@vueuse/components";

const sidebarIsExpanded = ref(true);

function handleClickOutside() {
  if (!sidebarIsExpanded.value) return;
  sidebarIsExpanded.value = false;
}
</script>

<template>
  <div
    id="__layout"
    class="max-h-full overflow-hidden grid grid-cols-[auto,1fr]"
  >
    <div class="overflow-auto border-r border-grey border-opacity-30">
      <Sidebar
        class="h-[300vh]"
        :is-expanded="sidebarIsExpanded"
        v-on-click-outside.bubble="handleClickOutside"
      />
    </div>
    <div class="h-full overflow-auto">
      <div class="min-h-full grid grid-rows-[auto,1fr]">
        <div
          class="sticky top-0 h-20 flex items-center bg-black border-b border-grey border-opacity-30"
        >
          <div class="container flex-shrink-0 w-full flex items-center gap-5">
            <button
              @click.stop="sidebarIsExpanded = !sidebarIsExpanded"
              class="border border-opacity-30 rounded-sm h-8 w-8 md:hidden flex items-center justify-center"
            >
              <IconsMenu class="h-5 w-5" />
            </button>
            <SearchWithResult class="max-w-md flex-grow" />
          </div>
        </div>
        <div class="mb-20 min-h-full">
          <slot />
        </div>
      </div>
      <ClientOnly>
        <Player v-show="currentTrack" class="fixed bottom-0 left-0 w-full" />
      </ClientOnly>
    </div>
  </div>
</template>

<style></style>
