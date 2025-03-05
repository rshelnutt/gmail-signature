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
    import { socialMap } from '@/composables/useSocial'

  const signatureStore = useSignatureStore()
  const { signature } = storeToRefs(signatureStore)
  const { addFileFromUrl, generate } = useZip()

  const parseFileName = (url: string) => {
    return url.split('/')!.pop() as string
  }

  const isBase64Image = (str: string) => {
    return str.startsWith('data:image')
  }

  const handleBundleAssets = async () => {
    const assetList = [] as Array<{url: string, filename: string}>

    // Add avatar if exists
    if (signature.value.avatarUrl) {
      const isBase64 = isBase64Image(signature.value.avatarUrl)

      assetList.push({
        url: signature.value.avatarUrl,
        filename: isBase64 ? 'email-avatar.png' : parseFileName(signature.value.avatarUrl)
      })
    }

    // Add barcode if exists
    if (signature.value.barcodeUrl) {
      assetList.push({
        url: signature.value.barcodeUrl,
        filename: 'email-barcode.png'
      })
    }
    
    // Add social icons
    signature.value.socialLinks.forEach((socialObj: SocialObjectModel) => {
      assetList.push({
        url: socialObj.iconHref!,
        filename: `email-icon-${socialObj.type}.png`
      })
    })

    if (!assetList.length) return
    
    // Use Promise.all to wait for all files to be added
    const addFilePromises = assetList.map(async (asset) => {
      if (asset.url) {
        console.log(`Adding file: ${asset.filename} from ${asset.url}`)
        return await addFileFromUrl(asset.filename, asset.url)
      }
      return false
    })
    
    await Promise.all(addFilePromises)
    
    generate()
  }
</script>
