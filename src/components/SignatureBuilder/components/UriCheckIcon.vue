<template>
  <div class="inline-block align-middle text-lg">
    <Icon :icon="iconMap.get(status)!" :class="iconClassMap.get(status)" />
  </div>
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { computed } from 'vue'

  type UriStatus = 'default' | 'success' | 'error'

  const props = defineProps<{
    status: UriStatus
  }>()

  const status = computed(() => props.status)

  const iconMap = new Map<UriStatus, string>([
    ['default', 'heroicons:ellipsis-horizontal-circle'],
    ['success', 'heroicons:check-circle-solid'],
    ['error', 'heroicons:x-circle-solid'],
  ])

  const iconClassMap = new Map<UriStatus, string>([
    ['default', 'text-neutral-500'],
    ['success', 'text-ba-green'],
    ['error', 'text-ba-red'],
  ])
</script>
