<template>
  <div
    :class="[
        'relative m-[3px]',
        'text-xl text-white',
        'after:content-[\'\']',
        'after:absolute',
        'after:rounded-full after:aspect-square',
        'after:h-[20px] hover:after:h-[24px]',
        'after:top-0 hover:after:top-[-2px]',
        'after:left-0 hover:after:left-[-2px]',
        'after:border-2 after:border-ba-red',
        'after:opacity-0 hover:after:opacity-100',
        'after:transition-all after:duration-300 after:ease-easy',
        'after:pointer-events-none'
    ]"
  >
    <Icon icon="heroicons:question-mark-circle-20-solid" />
  </div>
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue'
</script>
