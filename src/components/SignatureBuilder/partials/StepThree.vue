<template>
  <div class="grid gap-12 text-white/50">
    <div class="grid gap-4">
      <h2 class="text-2xl text-white">Step 1 - Download Assets</h2>

      <Card class="bg-black/[0.55]">
        <div>
          <ButtonBundleAssets />
        </div>
      </Card>
    </div>

    <div class="grid gap-4">
      <h2 class="text-2xl text-white">Step 2 - Extract Assets & Upload To Google Drive</h2>

      <Card class="bg-black/[0.55]">
        <p class="mb-8">
          Extract the assets and upload to either your
          <Anchor href="https://drive.google.com" target="_blank"> Google Drive <Icon icon="heroicons-outline:external-link" class="ml-1" /></Anchor>, or a host provider of your choice.
        </p>

        <h4 class="font-medium text-white mb-2">Uploading to Google Drive</h4>
        <p class="mb-4">Once uploaded, perform the following steps on each file to set the view permissions:</p>

        <ol class="list-inside list-decimal space-y-4 pl-6 font-medium text-white">
          <li>
            <span class="text-white/50"
              >Click the three dots in the top right corner of the file to open the file options.
              <Tooltip>
                <HelpTip />

                <template #content>
                  <img class="h-auto w-auto max-w-full drop-shadow-2xl" :src="AssetUploadStep1" alt="Asset Upload Step 1" />
                </template>
              </Tooltip>
            </span>
          </li>
          <li>
            <span class="text-white/50"
              >Select "Share", then "Share" again from the context menu.
              <Tooltip>
                <HelpTip />

                <template #content>
                  <img class="h-auto w-auto max-w-full drop-shadow-2xl" :src="AssetUploadStep2" alt="Asset Upload Step 2" />
                </template>
              </Tooltip>
            </span>
          </li>
          <li>
            <span class="text-white/50"
              >Under the "General Access" section, click the dropdown (if using BA work account, it defaults to the company). Change this option to "Anyone with the link".
              <Tooltip>
                <HelpTip />

                <template #content>
                  <img class="h-auto w-auto max-w-full drop-shadow-2xl" :src="AssetUploadStep3" alt="Asset Upload Step 3" />
                </template>
              </Tooltip>
            </span>
          </li>
        </ol>
      </Card>
    </div>

    <div class="grid gap-4">
      <h2 class="text-2xl text-white">Step 3 - Update Asset URIs</h2>

      <Card class="bg-black/[0.55] pb-8">
        <p class="mb-8">
          Update the source link for each image to its corresponding file in Google Drive. The link can be copied from the file's <strong>Share</strong> menu.
          <Tooltip>
            <HelpTip />

            <template #content>
              <img class="h-auto w-auto max-w-full drop-shadow-2xl" :src="AssetUploadStep4" alt="Asset Upload Step 4" />
            </template>
          </Tooltip>
        </p>

        <div class="grid space-y-15">
          <div class="grid gap-y-4">
            <div>
              <span class="mb-4 inline-block justify-self-start bg-white px-2 py-1 text-[10px] font-extrabold tracking-[0.06rem] text-black uppercase"> Elements </span>
            </div>

            <div class="grid gap-y-4">
              <!-- Avatar URI -->
              <div v-if="signature.avatarUrl">
                <Label
                  :value="`Avatar Image`"
                  class="after:ease-out-expo relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red-500 after:transition-all after:duration-300 after:content-[''] focus-within:after:w-full"
                  labelClass="pl-[10px]"
                >
                  <template #prepend>
                    <UriCheckIcon :status="uriValidationStatuses.get('avatarUrl') || 'default'" />
                  </template>

                  <InputText v-model="signatureAssets.avatarUrl" @input="debouncedValidateUri(signatureAssets.avatarUrl, 'avatarUrl')" />
                </Label>
              </div>

              <!-- Barcode URI -->
              <div v-if="signature.barcodeUrl">
                <Label
                  :value="`Barcode Image`"
                  class="after:ease-out-expo relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red-500 after:transition-all after:duration-300 after:content-[''] focus-within:after:w-full"
                  labelClass="pl-[10px]"
                >
                  <template #prepend>
                    <UriCheckIcon :status="uriValidationStatuses.get('barcodeUrl') || 'default'" />
                  </template>

                  <InputText v-model="signatureAssets.barcodeUrl" @input="debouncedValidateUri(signatureAssets.barcodeUrl, 'barcodeUrl')" />
                </Label>
              </div>

              <!-- Border URI -->
              <div v-if="signature.borderUrl">
                <Label
                  :value="`Border Image`"
                  class="after:ease-out-expo relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red-500 after:transition-all after:duration-300 after:content-[''] focus-within:after:w-full"
                  labelClass="pl-[10px]"
                >
                  <template #prepend>
                    <UriCheckIcon :status="uriValidationStatuses.get('borderUrl') || 'default'" />
                  </template>

                  <InputText v-model="signatureAssets.borderUrl" @input="debouncedValidateUri(signatureAssets.borderUrl, 'borderUrl')" />
                </Label>
              </div>
            </div>
          </div>

          <div class="grid gap-y-4" v-if="signatureAssets.socialLinks?.length">
            <div>
              <span class="mb-4 inline-block justify-self-start bg-white px-2 py-1 text-[10px] font-extrabold tracking-[0.06rem] text-black uppercase"> Social Media </span>
            </div>

            <!-- Social URIs -->
            <template v-for="(link, index) in signatureAssets.socialLinks" :key="index">
              <div>
                <Label
                  :value="`${useSocial(link.transType as string)?.name} Icon`"
                  class="after:ease-out-expo relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red-500 after:transition-all after:duration-300 after:content-[''] focus-within:after:w-full"
                  labelClass="pl-[10px]"
                >
                  <template #prepend>
                    <UriCheckIcon :status="uriValidationStatuses.get(link.transType) || 'default'" />
                  </template>

                  <InputText
                    v-model="signatureAssets.socialLinks[index].transIconHref"
                    @input="debouncedValidateUri(signatureAssets.socialLinks[index].transIconHref, link.transType)"
                  />
                </Label>
              </div>
            </template>
          </div>
        </div>

        <div class="mt-8">
          <div class="mb-4 flex items-center justify-center">
            <div class="inline-flex flex-col items-center gap-2">
              <span class="mx-auto text-sm font-semibold tracking-widest whitespace-nowrap text-white"> {{ countAssetsCompleted }} / {{ assetStatusArr.length }} </span>

              <ProgressBar :progress="assetProgress" :colorStops="['bg-ba-red', 'bg-yellow-500', 'bg-ba-green']" />
            </div>
          </div>

          <div class="ease-easy overflow-hidden text-center transition-[height] duration-500" :class="isComplete ? 'h-[56px]' : 'h-0'">
            <SystemsGo
              class="mx-auto"
              :class="[
                {
                  'animate-fade-in delay-500': isComplete,
                  'animate-fade-out pointer-events-none': !isComplete,
                },
              ]"
            />
          </div>
        </div>
      </Card>
    </div>

    <div class="mt-4">
      <Button class="flex items-center gap-2 place-self-end" @click="emitBus('changeStep', 'next')" :disabled="assetProgress !== 100">
        Next | Apply Signature
        <Icon icon="heroicons:arrow-right-16-solid" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import AssetUploadStep1 from '@/assets/asset-upload-step-1.png'
  import AssetUploadStep2 from '@/assets/asset-upload-step-2.png'
  import AssetUploadStep3 from '@/assets/asset-upload-step-3.png'
  import AssetUploadStep4 from '@/assets/asset-upload-step-4.png'
  import Anchor from '@/components/Anchor.vue'
  import Button from '@/components/Button.vue'
  import Card from '@/components/Card.vue'
  import HelpTip from '@/components/HelpTip.vue'
  import InputText from '@/components/InputText.vue'
  import Label from '@/components/Label.vue'
  import ProgressBar from '@/components/ProgressBar.vue'
  import ButtonBundleAssets from '@/components/SignatureBuilder/components/ButtonBundleAssets.vue'
  import UriCheckIcon from '@/components/SignatureBuilder/components/UriCheckIcon.vue'
  import SystemsGo from '@/components/SystemsGo.vue'
  import Tooltip from '@/components/Tooltip.vue'
  import useEventsBus from '@/composables/useEventBus'
  import useSocial from '@/composables/useSocial'
  import { useUriValidation } from '@/composables/useUriValidation'
  import { useSignatureStore } from '@/stores/useSignatureStore'
  import type { SignatureAssetsModel } from '@/types'
  import { Icon } from '@iconify/vue'
  import { storeToRefs } from 'pinia'
  import { computed, onMounted, ref, watch } from 'vue'

  const { emitBus } = useEventsBus()

  const signatureStore = useSignatureStore()
  const { signature, signatureAssets } = storeToRefs(signatureStore)

  const { uriValidationStatuses, debouncedValidateUri, validateAllUris } = useUriValidation()

  const ranInit = ref(false)
  const assetStatusArr = computed(() => Array.from(uriValidationStatuses.value))

  const countAssetsCompleted = computed(() => {
    return assetStatusArr.value.filter((status) => status[1] === 'success').length
  })

  const assetProgress = computed(() => {
    if (assetStatusArr.value.length === 0) return 0

    const total = assetStatusArr.value.length

    return Math.round((countAssetsCompleted.value / total) * 100)
  })

  const isComplete = computed(() => {
    return assetProgress.value === 100
  })

  const handleValidateAssets = async (assets: SignatureAssetsModel) => {
    // Create a single object containing all URIs to validate
    const urisToValidate: Record<string, string> = {}

    if (assets?.avatarUrl) {
      urisToValidate['avatarUrl'] = assets.avatarUrl
    }

    if (assets?.barcodeUrl) {
      urisToValidate['barcodeUrl'] = assets.barcodeUrl
    }

    if (assets?.borderUrl) {
      urisToValidate['borderUrl'] = assets.borderUrl
    }

    if (assets.socialLinks?.length > 0) {
      assets.socialLinks.forEach((link: any) => {
        if (link.transIconHref) {
          urisToValidate[link.transType] = link.transIconHref
        }
      })
    }

    // Use the batch validation method
    return validateAllUris(urisToValidate)
  }

  onMounted(() => {
    if (signature.value?.socialLinks.length) {
      const existingSocialLinks = signatureAssets.value.socialLinks || []

      const existingUriMap = new Map(existingSocialLinks.map((link: any) => [link.transType, link.transIconHref]))

      const updatedSocialLinks = signature.value.socialLinks.reduce((acc: any[], sigLink: any) => {
        if (sigLink.type) {
          const existingUri = existingUriMap.get(sigLink.type)

          acc.push({
            transType: sigLink.type,
            transIconHref: existingUri || '', // Use existing URI if available
          })
        }
        return acc
      }, [])

      signatureAssets.value.socialLinks = updatedSocialLinks
    }

    // Initialize validation statuses
    if (signature.value?.avatarUrl) uriValidationStatuses.value.set('avatarUrl', 'default')
    if (signature.value?.barcodeUrl) uriValidationStatuses.value.set('barcodeUrl', 'default')
    if (signature.value?.borderUrl) uriValidationStatuses.value.set('borderUrl', 'default')

    signatureAssets.value.socialLinks.forEach((link: any) => {
      uriValidationStatuses.value.set(link.transType, 'default')
    })

    ranInit.value = true

    // Run initial validation for any pre-existing values
    if (signatureAssets.value) handleValidateAssets(signatureAssets.value)
  })
</script>
