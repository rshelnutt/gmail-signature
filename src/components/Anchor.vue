<template>
  <a class="relative inline-flex items-center white text-white after:absolute after:content-[''] after:block after:bg-ba-red after:w-0 after:h-[1px] after:left-0 after:bottom-[-2px] hover:after:w-full after:transition-[width] duration-500 ease-easy">
    <slot />
  </a>
</template>

<script setup lang="ts">
  withDefaults(defineProps<{
    target?: string
  }>(), {
    target: '_self'
  })
</script>
