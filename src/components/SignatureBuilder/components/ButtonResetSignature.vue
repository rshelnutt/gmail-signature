<template>
  <div typeof="button" class="group absolute -top-[12px] -right-[12px] cursor-pointer shadow-lg" @click="handleResetSignatureConfirm">
    <button
        type="button"
        :class="[
          'relative flex items-center justify-end bg-ba-black text-white border border-gray-500',
          'rounded-full p-2',
          'group-hover:bg-ba-red',
          'ease-out-expo transition-all duration-700',
          'pointer-events-none'
        ]"
      >
        <Icon class="text-xl group-hover:rotate-[360deg] group-hover:duration-[2s] duration-0 ease-out-expo transition-all" icon="radix-icons:reload" />
      </button>
  </div>
</template>

<script setup lang="ts">
  import { useSignatureStore } from '@/stores/useSignatureStore'
  import { Icon } from '@iconify/vue'

  const signatureStore = useSignatureStore()
  const { $resetSignature } = signatureStore

  const handleResetSignatureConfirm = () => {
    if (confirm('Are you sure you want to reset the form? All data will be cleared, including any uploaded images.') == true) {
      $resetSignature()
    } else {
    }
  }
</script>
