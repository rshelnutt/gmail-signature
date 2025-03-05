<template>

</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { AccordionContent, AccordionHeader, AccordionItem, AccordionTrigger } from 'radix-vue'
  
  const props = defineProps<{
    key: string
    title: string
  }>()
</script>
