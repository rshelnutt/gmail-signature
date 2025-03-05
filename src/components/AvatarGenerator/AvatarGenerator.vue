<template>
  <div>
    <IKContext :urlEndpoint="urlEndpoint" :publicKey="publicKey" :authenticator="authenticator">
      <div class="relative h-[250px]">
        <div 
          class="absolute inset-0" 
          :class="[{
            'delay-300 animate-fade-in': showAvatar,
            'animate-fade-out pointer-events-none': !showAvatar
          }]"
        >
          <div class="flex flex-col items-center gap-4 p-4">
            <AvatarPreview :previewSrc="signature.avatarUrl" />
            <ProgressBar 
              :progress="uploadProgressProxy" 
              :class="[{
                'opacity-0 h-0': uploadProgressProxy === 100
              }]" 
            />
          </div>
        </div>

        <div class="grid gap-4 h-full" :class="{ 'animate-fade-out-shrink pointer-events-none': showAvatar }">
          <div
            class="relative cursor-pointer rounded-lg border-2 border-dashed grid place-items-center bg-[#1F1F1F] border-[#696969] p-6 transition-colors hover:border-[#A9A9A9]"
            :class="{ 'border-ba-red bg-[#242424]': dragOver }"
            @dragover.prevent="dragOver = true"
            @dragleave.prevent="dragOver = false"
            @drop.prevent="handleDrop"
            @click="handleClick"
          >
            <div class="flex flex-col items-center justify-center space-y-2 text-neutral-400">
              <Icon class="text-[4rem]" icon="line-md:image-twotone" />

              <div class="text-sm ">
                <span>Drag and drop your photo here, or</span>
                <span class="text-white/80 hover:text-white"> browse</span>
              </div>

              <div class="text-xs text-neutral-500">Supported formats: PNG, JPG, JPEG</div>
            </div>

            <IKUpload
              ref="uploadInputRef"
              :onError="onError"
              :onSuccess="onSuccess"
              :onUploadProgress="onUploadProgress"
              :onUploadStart="onUploadStart"
              :validateFile="validateFile"
              :transformation="{
                pre: 'w-114,h-114,t-false,q-100,fo-face,z-0.65,l-image,i-email-caret.svg,lfo-bottom_right,l-end,f-png',
              }"
              class="invisible w-[1px] h-[1px] overflow-hidden absolute top-0 left-0"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <div
        class="h-[4rem] transition-all ease-easy select-none overflow-hidden pointer-events-none"
        :class="[{
          '!h-0 opacity-0': showAvatar
        }]"
      >
        <p class="py-4 font-medium font-heading text-2xl uppercase tracking-[0.06rem] text-white text-center">
          OR
        </p>
      </div>

      <div class="text-center">
        <Button 
          variant="secondary"
          @click="setDefaultAvatar"
          :class="[{
            'animate-fade-in': !showAvatar,
            'animate-fade-out pointer-events-none':showAvatar
          }]"
          v-if="!showAvatar"
        >
          Use Default Avatar
        </Button>

        <Button 
          class="flex items-center gap-2 mx-auto"
          :class="[{
            'animate-fade-in': showAvatar,
            'animate-fade-out pointer-events-none':!showAvatar
          }]"
          variant="secondary"
          @click="resetAvatar" 
          v-if="showAvatar"
        >
          <Icon icon="fluent:arrow-reset-24-regular" class="text-2xl" /> Reset Avatar
        </Button>
      </div>
    </IKContext>
  </div>
</template>

<script setup lang="ts">
  // @ts-ignore
  import { IKContext, IKImage, IKUpload } from 'imagekitio-vue'
  import AvatarPreview from '@/components/AvatarGenerator/AvatarPreview.vue'
  import ProgressBar from '@/components/ProgressBar.vue'
  import { useSignatureStore } from '@/stores/useSignatureStore'
  import { storeToRefs } from 'pinia'
  import { computed, ref } from 'vue'
  import Button from '@/components/Button.vue'
  import { Icon } from '@iconify/vue'
  import EmailAvatar from '@/assets/email-avatar.png'

  const emit = defineEmits(['avatarUploading'])

  const signatureStore = useSignatureStore()
  const { signature } = storeToRefs(signatureStore)

  const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT
  const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY

  const uploadInputRef = ref()
  const dragOver = ref(false)
  const isUploading = ref(false)
  const uploadProgress = ref(0)

  const showAvatar = computed(() => {
    return signature.value.avatarUrl || isUploading.value
  })

  const uploadProgressProxy = computed(() => {
    // Check if the store already has an avatarUrl;
    // if it does, return 100%
    if (signature.value.avatarUrl) return 100
    return uploadProgress.value
  })

  const setDefaultAvatar = () => {
    // signature.value.avatarUrl = 'https://ik.imagekit.io/ds612/tr:w-114,h-114,t-false,fo-face,z-0.65,q-90,f-png:f-png,l-image,i-email-caret.svg,lfo-bottom_right,l-end/email-default.png'
    signature.value.avatarUrl = EmailAvatar
  }

  const resetAvatar = () => {
    signature.value.avatarUrl = ''
  }

  const transformation = [
    {
      width: '114',
      height: '114',
      trim: 'false',
      raw: 'fo-face,z-0.65',
      quality: '100',
      format: 'png',
    },
    {
      format: 'png',
      quality: '100',
      raw: 'l-image,i-email-caret.svg,lfo-bottom_right,l-end',
    },
  ]

  const handleClick = () => {
    uploadInputRef.value.$el.querySelector('input[type="file"]').click()
  }

  const handleDrop = (e: DragEvent) => {
    dragOver.value = false
    if (e.dataTransfer?.files) {
      const file = e.dataTransfer.files[0]
      if (file && validateFile({ size: file.size, type: file.type })) {
        console.log('passed the checks')
        uploadInputRef.value.$el.querySelector('input[type="file"]').files = e.dataTransfer.files
        const event = new Event('change', { bubbles: true })
        uploadInputRef.value.$el.querySelector('input[type="file"]').dispatchEvent(event)
      }
    }
  }

  // Upload handlers
  const onError = (err: any) => {
    isUploading.value = false

    try {
      console.error(err)
    } catch (e) {
      console.error(e)
    }
  }

  const onSuccess = (res: any) => {
    isUploading.value = false
    try {
      signature.value.avatarUrl = res.url
    } catch (e) {
      console.error(e)
    }
  }

  const validateFile = (res: any) => {
    if (res.size > 0) {
      return true
    }
    return false
  }

  const onUploadStart = () => {
    isUploading.value = true
  }

  const onUploadProgress = (event: any) => {
    uploadProgress.value = (event.loaded / event.total) * 100
  }

  const authenticator = () => {
    return new Promise((resolve, reject) => {
      var url = import.meta.env.VITE_AUTH_API_URL

      fetch(url, { method: 'GET', mode: 'cors' }) // Enable CORS mode
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
          }
          return response.json()
        })
        .then((body) => {
          var obj = {
            signature: body.signature,
            expire: body.expire,
            token: body.token,
          }
          resolve(obj)
        })
        .catch((error) => {
          reject([error])
        })
    })
  }
</script>
