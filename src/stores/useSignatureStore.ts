import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { SignatureModel, SignatureAssetsModel } from '@/types'
import EmailBarcode from '@/assets/email-barcode.png'
import EmailBorder from '@/assets/email-border.png'
import useEventBus from "@/composables/useEventBus"

export const useSignatureStore = defineStore('signatureStore', () => {
  const { emitBus } = useEventBus()

  const signature = ref<SignatureModel>({
    avatarUrl: '',
    name: '',
    title: '',
    socialLinks: [],
    footerPhone: '',
    footerLink: 'https://',
    footerLinkText: '',
    barcodeUrl: EmailBarcode,
    borderUrl: EmailBorder
  })

  const signatureAssets = reactive<SignatureAssetsModel>({
    avatarUrl: '',
    socialLinks: [],
    barcodeUrl: '',
    borderUrl: ''
  })

  function $updateSignature(data: Partial<SignatureModel>) {
    signature.value = { ...signature.value, ...data }
  }

  function $resetSignature() {
    signature.value = {
      avatarUrl: '',
      name: '',
      title: '',
      socialLinks: [],
      footerPhone: '',
      footerLink: 'https://',
      footerLinkText: '',
      barcodeUrl: EmailBarcode,
      borderUrl: EmailBorder
    }

    $resetAssets()

    emitBus('changeStep', 1)
  }

  function $resetAssets() {
    signatureAssets.avatarUrl = ''
    signatureAssets.socialLinks = []
    signatureAssets.barcodeUrl = ''
    signatureAssets.borderUrl = ''
  }

  return {
    signature,
    signatureAssets,
    $updateSignature,
    $resetSignature
  }
}, {
  persist: true
})