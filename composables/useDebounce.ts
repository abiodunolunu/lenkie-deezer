export function debouncedValue<T>(originalValue: Ref<T>, wait: number) {
  let result = ref<T>(originalValue.value) as Ref<T>;

  let timer: NodeJS.Timeout;
  watch(originalValue, (newVal) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      result.value = newVal;
    }, wait);
  });

  return result;
}
