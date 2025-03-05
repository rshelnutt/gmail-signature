<template>
  <Button class="inline-flex items-center gap-1 !px-4" variant="secondary" @click="handleBundleAssets">
    <p class="border-r border-neutral-500 pr-5">Generate & Download Asset Bundle</p>
    <Icon icon="heroicons-solid:download" class="text-ba-red ml-3 text-xl" />
  </Button>
</template>

<script setup lang="ts">
  import type { SocialObjectModel } from '@/types'
  import { storeToRefs } from 'pinia'
  import Button from '@/components/Button.vue'
  import { useSignatureStore } from '@/stores/useSignatureStore'
  import useZip from '@/composables/useZip'
  import { Icon } from '@iconify/vue'

  const signatureStore = useSignatureStore()
  const { signature } = storeToRefs(signatureStore)
  const { addFileFromUrl, generate } = useZip()

  const parseFileName = (url: string) => {
    return url.split('/')!.pop() as string
  }

  const handleBundleAssets = async () => {
    const assetList = [
        signature.value.avatarUrl,
        signature.value.barcodeUrl,
        signature.value.borderUrl,
        ...signature.value.socialLinks.map((socialObj: SocialObjectModel) => socialObj.iconHref)
    ] as string[]

    if (!assetList.length) return
    
    // Use Promise.all to wait for all files to be added
    const addFilePromises = assetList.map(async (assetUrl: string) => {
      if (assetUrl) {
        return await addFileFromUrl(parseFileName(assetUrl), assetUrl)
      }
      return false
    })
    
    await Promise.all(addFilePromises)
    
    generate()
  }
</script>
