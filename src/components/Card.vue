<template>
  <div class="relative rounded-2xl p-6 shadow-lg" :class="variantMap.get($props.variant!)">
    <slot />
  </div>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      variant?: 'dark' | 'light' | 'glass'
    }>(),
    {
      variant: 'dark',
    }
  )

  const variantMap = new Map([
    ['dark', 'bg-[#2f2f2f]'],
    ['light', 'bg-white'],
    ['glass', 'bg-[#7C7C7C]/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/30'],
  ])
</script>
