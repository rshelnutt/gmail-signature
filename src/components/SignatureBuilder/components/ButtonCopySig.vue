<template>
  <div
    class="relative perspective-distant inline-block"
    :class="{ 'animate-pulse-grow': !flipToggled }"
  >
    <div
      class="relative transform-3d ease-out-expo duration-500"
      :class="{ 'rotate-x-180': flipToggled }"
    >
      <Button class="w-[220px] relative z-10 backface-hidden" @click="handleCopySignature" ref="buttonRef">
        Copy Signature
      </Button>

      <div class="text-white absolute top-0 left-0 w-full h-full bg-black z-0 flex justify-center items-center rotate-x-180 pointer-events-none select-none">
        <p class="text-sm flex-none tracking-[0.06rem] font-heading font-medium uppercase">
          Copied to clipboard!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, type RendererNode } from 'vue'
  import Button from '@/components/Button.vue'
  import useConfetti from '@/composables/useConfetti'

  const props = defineProps<{
    tableRef: RendererNode | null | undefined
  }>()

  const buttonRef = ref(null)
  const flipToggled = ref(false)

  const { callFireworks } = useConfetti()

  const runSuccessAnimations = () => {
    callFireworks()
    flipToggled.value = true
    
    const timeout = setTimeout(() => {
      flipToggled.value = false
    }, 1000)
    
    return () => clearTimeout(timeout)
  }

  const handleCopySignature = async () => {
    if (flipToggled.value) return
    if (!props.tableRef) return

    const tableElement = props.tableRef.$el

    try {
      const range = document.createRange()
      range.selectNode(tableElement)
      
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
      
      document.execCommand('copy')
      selection?.removeAllRanges()

      runSuccessAnimations()
      
    } catch (err) {
      console.error('Unable to copy signature table', err)
    }
  }
</script>
