<template>
  <div class="flex flex-col">
    <Label
      class="flex items-center gap-1 text-xs leading-[1.5em] font-semibold mb-1 font-heading uppercase tracking-[0.06rem]"
      :class="themeClass[props.theme] + ' ' + props.labelClass"
      :for="props.name"
    >
    <slot name="prepend" /> {{ props.value }} <slot name="append" />
    </Label>
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { Label } from 'radix-vue'

  const props = withDefaults(defineProps<{
    value: string
    name?: string
    theme?: 'dark' | 'light'
    labelClass?: string
  }>(), {
    theme: 'dark'
  })

  const themeClass = {
    'dark': 'text-white',
    'light': 'text-black'
  }
</script>
