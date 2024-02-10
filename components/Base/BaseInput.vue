<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";

interface Props {
  inputProps: InputHTMLAttributes;
}
const props = defineProps<Props>();

const modelValue = defineModel({ default: "" });
</script>

<template>
  <div
    class="border border-grey border-opacity-30 h-12 bg-white bg-opacity-10 text-grey px-4 flex items-center rounded-lg focus-within:bg-black focus-within:text-white"
  >
    <slot name="leftIcon" />
    <input
      class="bg-transparent outline-none h-full flex-grow mx-4 placeholder:text-grey"
      v-model="modelValue"
      v-bind="inputProps"
    />
    <slot name="rightIcon" />
  </div>
</template>

<style></style>
