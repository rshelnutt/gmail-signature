<template>
  <div class="grid gap-8">
    <AvatarGenerator />

    <div class="mt-4">
      <Button class="flex items-center gap-2 place-self-end" @click="emitBus('changeStep', 'next')">
        Next | Download Assets
        <Icon icon="heroicons:arrow-right-16-solid" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Button from '@/components/Button.vue'
  import useEventsBus from '@/composables/useEventBus'
  import { useSignatureStore } from '@/stores/useSignatureStore'
  import { Icon } from '@iconify/vue'
  import { storeToRefs } from 'pinia'
  import AvatarPreview from '@/components/AvatarGenerator/AvatarPreview.vue'
  import AvatarGenerator from '@/components/AvatarGenerator/AvatarGenerator.vue'

  const { emitBus } = useEventsBus()

  const signatureStore = useSignatureStore()
  const { signature } = storeToRefs(signatureStore)
</script>
