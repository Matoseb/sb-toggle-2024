export function useResult(data, error) {
  return computed(() => {
    return data.value?.result
  })
}
