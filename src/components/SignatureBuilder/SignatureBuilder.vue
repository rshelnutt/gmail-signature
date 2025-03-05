<template>
  <div class="flex flex-col gap-10 pb-10">
    <div ref="wrapperRef" class="ease-out-expo flex flex-col gap-10 transition-[height] duration-500">
      <PreviewPanel v-slot="{ isLightMode }">
        <div class="flex flex-col h-full justify-center items-center p-4">
            <div class="flex flex-col justify-center flex-1">
              <SignatureTable :="signature" ref="signatureTableRef" />

              <div class="ease-easy h-0 overflow-hidden text-center opacity-0 transition-[height,_opacity] duration-300" :class="{ '!h-[80px] !opacity-100': activeStep === 4 }">
                <ButtonCopySig :tableRef="signatureTableRef" class="mt-10" />
              </div>
            </div>

            <div>
              <p
                class="italic mt-4 min-w-[300px] mx-auto text-center text-sm opacity-0 transition-[opacity] duration-300"
                :class="[
                  { '!opacity-100': activeStep === 4 },
                  { 'text-white/80': !isLightMode },
                  { 'text-ba-black': isLightMode },
                ]"
              >
                Copy your signature above, then paste (cmd/ctrl + v) in your Gmail settings.
              </p>

              <div class="ease-easy h-0 overflow-hidden text-center opacity-0 transition-[height,_opacity] duration-300" :class="{ '!h-[66px] !opacity-100': activeStep === 4 }">
                <div class="grid grid-flow-col auto-cols-fr gap-8 items-center mt-6">
                  <Button :variant="isLightMode ? 'secondary-dark' : 'secondary'" @click="() => emitBus('changeStep', 3)">
                    <div class="flex items-center justify-center gap-2">
                      <Icon icon="heroicons:arrow-left-16-solid" /> Go Back
                    </div>
                  </Button>

                  <Button :variant="isLightMode ? 'secondary-dark' : 'secondary'" @click=handleResetSignatureConfirm>
                    <div class="flex items-center justify-center gap-2">
                      <Icon icon="radix-icons:reload" /> Start Over
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
      </PreviewPanel>

      <div ref="stepperRef">
        <Stepper @stepUpdated="(newStep) => (activeStep = newStep)">
          <StepperStep :step="1" title="Configure Data" description="Add your contact details" icon="radix-icons:home" />
          <StepperStep :step="2" title="Set Avatar" description="Use default or upload custom" icon="radix-icons:transform" />
          <StepperStep :step="3" title="Download Assets" description="Package the files together" icon="radix-icons:download" />
          <StepperStep :step="4" title="Apply Signature" description="Add your signature to Gmail" icon="radix-icons:id-card" />
        </Stepper>
      </div>
    </div>

    <div class="ease-out-expo relative transition-all duration-500" :class="{ '!h-0 overflow-hidden opacity-0': activeStep === 4 }">
      <div
        class="ease-out-expo flex flex-col transition-all duration-500"
        :class="['relative rounded-2xl p-6 shadow-lg', 'border border-white/30 bg-[#7C7C7C]/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5px]']"
        variant="glass"
        ref="cardRef"
      >
        <StepOne v-if="activeStep === 1" />
        <StepTwo v-if="activeStep === 2" />
        <StepThree v-if="activeStep === 3" />
      </div>

      <ButtonResetSignature />
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { SignatureModel } from '@/types'
  import { RendererNode, computed, onMounted, onUnmounted, ref, type Ref } from 'vue'

  import useSocial from '@/composables/useSocial'
  import { useSignatureStore } from '@/stores/useSignatureStore'
  import { storeToRefs } from 'pinia'

  import PreviewPanel from '@/components/PreviewPanel.vue'
  import ButtonCopySig from '@/components/SignatureBuilder/components/ButtonCopySig.vue'
  import StepOne from '@/components/SignatureBuilder/partials/StepOne.vue'
  import StepThree from '@/components/SignatureBuilder/partials/StepThree.vue'
  import StepTwo from '@/components/SignatureBuilder/partials/StepTwo.vue'
  import SignatureTable from '@/components/SignatureTable.vue'
  import Stepper from '@/components/Stepper/Stepper.vue'
  import StepperStep from '@/components/Stepper/StepperStep.vue'
  import ButtonResetSignature from './components/ButtonResetSignature.vue'
  import Button from '@/components/Button.vue'
  import { Icon } from '@iconify/vue'
  import useEventBus from '@/composables/useEventBus'

  const { $resetSignature } = useSignatureStore()
  const signatureStore = storeToRefs(useSignatureStore())
  const { signature } = signatureStore

  const { emitBus } = useEventBus()

  const activeStep = ref(1)
  const signatureTableRef = ref(null) as Ref<RendererNode | null>
  const wrapperRef = ref(null) as Ref<HTMLElement | null>
  const cardRef = ref(null) as Ref<HTMLElement | null>

  // Height tracking
  const stepperRef = ref(null) as Ref<HTMLElement | null>
  const wrapperHeight = ref(0)
  const cardHeight = ref(0)

  const getClonedNodeHeight = (node: HTMLElement) => {
    const clone = node.cloneNode(true) as HTMLElement
    clone.style.height = 'auto'
    clone.style.position = 'absolute'
    clone.style.visibility = 'hidden'
    document.getElementById('app')?.appendChild(clone)
    const height = clone.getBoundingClientRect().height
    document.getElementById('app')?.removeChild(clone)
    return height
  }

  const expandedHeight = computed(() => {
    if (!stepperRef.value) return 0

    const windowHeight = window.innerHeight
    const stepperHeight = stepperRef.value.getBoundingClientRect().height

    // Using the windowHeight, we subtract the height of
    // the stepper from what would be considered 82dvh
    const takeoverHeight = windowHeight * 0.82
    return takeoverHeight - stepperHeight
  })

  // Function to update component heights
  const updateHeights = () => {
    if (wrapperRef.value) {
      wrapperHeight.value = getClonedNodeHeight(wrapperRef.value)

      if (wrapperRef.value.style) {
        if (activeStep.value === 4) {
          wrapperRef.value.style.height = `${expandedHeight.value}px`
        } else {
          wrapperRef.value.style.height = `${wrapperHeight.value}px`
        }
      }
    }

    if (cardRef.value) {
      cardHeight.value = getClonedNodeHeight(cardRef.value)

      if (cardRef.value.style) {
        cardRef.value.style.height = `${cardHeight.value}px`
      }
    }
  }

  const resizeObserver = new ResizeObserver(() => {
    updateHeights()
  })

  const mutationObserver = new MutationObserver(() => {
    updateHeights()
  })

  const handleResetSignatureConfirm = () => {
    if (confirm('Are you sure you want to reset the form? All data will be cleared, including any uploaded images.') == true) {
      $resetSignature()
    } else {
    }
  }

  onMounted(() => {
    updateHeights()

    if (wrapperRef.value) {
      resizeObserver.observe(wrapperRef.value)
      mutationObserver.observe(wrapperRef.value, {
        childList: true,
        subtree: true,
      })
    }

    if (cardRef.value) {
      resizeObserver.observe(cardRef.value)
      mutationObserver.observe(cardRef.value, {
        childList: true,
        subtree: true,
      })
    }

    window.addEventListener('resize', updateHeights)
  })

  onUnmounted(() => {
    resizeObserver.disconnect()
    mutationObserver.disconnect()
    window.removeEventListener('resize', updateHeights)
  })
</script>
