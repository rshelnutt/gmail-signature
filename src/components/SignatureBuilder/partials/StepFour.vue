<template>
  <div class="grid gap-8">
    

  </div>
</template>

<script setup lang="ts">
  import useEventsBus from '@/composables/useEventBus'
  import { useSignatureStore } from '@/stores/useSignatureStore'
  import { Icon } from '@iconify/vue'
  import { storeToRefs } from 'pinia'

  const { emitBus } = useEventsBus()

  const signatureStore = useSignatureStore()
  const { signature } = storeToRefs(signatureStore)
</script>
