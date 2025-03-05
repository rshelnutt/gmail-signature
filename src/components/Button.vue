<template>
  <button
    :class="[
      'px-6 py-2',
      'font-heading font-medium tracking-[0.06rem] uppercase disabled:cursor-not-allowed',
      'ease-out-expo transition-all',
      'cursor-pointer select-none',
      ...variantClass.get($props.variant!)
    ]"
    type="button"
  >
    <slot v-if="$slots.default" />
    <template v-else>{{ label }}</template>
  </button>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      variant?: 'default' | 'secondary' | 'secondary-dark'
      label?: string
      type?: 'submit' | 'reset' | 'button'
    }>(),
    {
      variant: 'default',
      type: 'button',
    }
  )

  const variantClass = new Map([
    ['default',  [
      'bg-ba-red text-white',
      'hover:bg-ba-red-dark',
      'disabled:bg-[#6F6F6F] disabled:text-[#8E8E8E]'
    ]],
    ['secondary',  [
      'bg-transparent text-white',
      'border border-white hover:border-ba-red focus:border-ba-red',
      'disabled:border-[#6F6F6F] disabled:text-[#8E8E8E]'
    ]],
    ['secondary-dark',  [
      'bg-transparent text-ba-black',
      'border border-ba-black hover:border-ba-red focus:border-ba-red',
      'disabled:border-[#6F6F6F] disabled:text-[#8E8E8E]'
    ]],
  ])
</script>
