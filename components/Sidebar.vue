<script setup lang="ts">
import Home from "./Icons/Home.vue";
import UserHexagon from "./Icons/UserHexagon.vue";
interface Props {
  isExpanded: boolean;
}

const props = defineProps<Props>();

const links = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Artists",
    path: "/artists",
    icon: UserHexagon,
  },
];
</script>

<template>
  <div
    class="w-[280px] bg-lightblack fixed duration-200 -translate-x-full md:translate-x-0 md:static z-10"
    :class="{
      'translate-x-0': isExpanded,
    }"
  >
    <div
      class="h-20 border-b border-grey border-opacity-30 sticky top-0 flex items-center gap-5 px-8 text-2xl font-semibold"
    >
      <img
        class="rounded-full"
        src="https://placehold.it/48x48/5773ff/ffffff?text=DEEZER"
        alt=""
      />
      Deezer
    </div>
    <div class="py-10 px-4">
      <NuxtLink
        v-for="link in links"
        :key="link.name"
        class="flex items-center gap-4 hover:bg-grey hover:bg-opacity-20 h-14 text-sm px-4 rounded-lg cursor-pointer"
        :to="link.path"
      >
        <component :is="link.icon" class="h-6 w-6" />
        <span>
          {{ link.name }}
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.router-link-active {
  @apply bg-grey bg-opacity-20;
}
</style>
