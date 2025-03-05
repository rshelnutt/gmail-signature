<template>
  <div class="grid gap-8">
    <Label value="Basic Info" label-class="mb-2 pl-[10px]">
      <Card class="bg-black/[0.55]">
        <div class="grid gap-y-4">
          <InputText label="Name" v-model="signature.name" />

          <InputText label="Title" v-model="signature.title" />

          <InputText label="Phone" v-model="signature.footerPhone" />

          <Label value="Footer Link" labelClass="pl-[10px]">
            <div class="grid grid-cols-[minmax(150px,20%)_auto] gap-4">
              <InputText placeholder="Text" v-model="signature.footerLinkText" />

              <InputText placeholder="Href" v-model="signature.footerLink" />
            </div>
          </Label>
        </div>
      </Card>
    </Label>

    <Label value="Social Links" label-class="mb-2 pl-[10px]">
      <Card class="bg-black/[0.55]">
        <div class="grid gap-y-4">
          <template v-for="(link, index) in signature.socialLinks">
            <div class="grid grid-cols-[auto_20px] gap-4 last:mb-10">
              <InputSocial
                :available-social-types="availableSocialTypes"
                :social-value="link.type!"
                :value="link.linkHref!"
                @update:value="(socialObj) => (signature.socialLinks[index] = socialObj)"
              />

              <button type="button" @click="signature.socialLinks.splice(index, 1)" class="hover:text-ba-red ease-out-expo cursor-pointer text-2xl text-white transition-colors">
                <Icon icon="heroicons:x-mark-20-solid" />
              </button>
            </div>
          </template>
        </div>

        <Button
          class="flex items-center gap-2"
          variant="secondary"
          @click="
            signature.socialLinks.push({
              type: null,
              linkHref: null,
            })
          "
          :disabled="availableSocialTypes.length <= 0 || signature.socialLinks.length >= socialArray.length"
        >
          <Icon class="text-xl" icon="heroicons:plus-16-solid" />
          <p>Add Platform</p>
        </Button>
      </Card>
    </Label>

    <div class="mt-4">
      <Button class="flex items-center gap-2 place-self-end" @click="emitBus('changeStep', 'next')">
        Next | Set Avatar
        <Icon icon="heroicons:arrow-right-16-solid" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Button from '@/components/Button.vue'
  import Card from '@/components/Card.vue'
  import InputText from '@/components/InputText.vue'
  import Label from '@/components/Label.vue'
  import InputSocial from '@/components/SignatureBuilder/components/InputSocial.vue'
  import { socialMap } from '@/composables/useSocial'
  import { useSignatureStore } from '@/stores/useSignatureStore'
  import type { SocialTypeModel } from '@/types'
  import { Icon } from '@iconify/vue'
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'
  import useEventsBus from "@/composables/useEventBus"

  const { emitBus } = useEventsBus()

  const signatureStore = useSignatureStore()
  const { signature } = storeToRefs(signatureStore)

  const socialArray = computed(() => Array.from(socialMap))

  const availableSocialTypes = computed(() => {
    return socialArray.value?.reduce((acc, [key, _]) => {
      if (!signature.value?.socialLinks.find((link) => link.type === key)) {
        acc.push(key as SocialTypeModel)
      }
      return acc
    }, [] as SocialTypeModel[])
  })
</script>
