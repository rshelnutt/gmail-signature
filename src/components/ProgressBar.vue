<template>
  <ProgressRoot
    v-model="progressValue"
    class="relative overflow-hidden drop-shadow-md bg-black rounded-full w-full sm:w-[300px] h-[8px] transition-all duration-300 ease-easy"
    style="transform: translateZ(0)"
  >
    <ProgressIndicator
      class="rounded-full w-full h-full transition-[transform,_background-color] duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
      :class="colorStopClasses"
      :style="`transform: translateX(-${100 - progressValue}%)`"
    />
  </ProgressRoot>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import { ProgressIndicator, ProgressRoot } from 'radix-vue'

    const props = defineProps<{
        progress: number,
        colorStops?: string[]
    }>()

    const progressValue = computed(() => {
      return props.progress
    })

    const colorStops = computed(() => {
      return props.colorStops
    })

    const colorStopClasses = computed(() => {
      if (!colorStops.value || !colorStops.value?.length) return 'bg-ba-red'

      const colorStopLength = colorStops.value.length
      
      // Return the last color stop if progress is 100%
      if (progressValue.value === 100) {
        return colorStops.value[colorStopLength - 1]
      }

      // Calculate the interval size for remaining progress (0-99%)
      const intervalSize = 100 / (colorStopLength - 1)
      // Get the current interval index (0 to colorStopLength-2)
      const colorStopIndex = Math.min(
        Math.floor(progressValue.value / intervalSize),
        colorStopLength - 2
      )

      return colorStops.value[colorStopIndex]
    })
</script>