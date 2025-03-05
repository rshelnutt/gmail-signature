<template>
  <StepperRoot
    :default-value="1"
    :linear="true"
    class="flex w-full gap-2"
    v-model="activeStep"
  >
    <StepperItem
      v-for="item in steps"
      :key="item.props?.step"
      class="group relative flex w-full flex-col items-center justify-center gap-2 px-4 data-[disabled]:pointer-events-none"
      :step="item.props?.step"
      :disabled="item.props?.disabled || false"
    >
      <StepperTrigger
        :class="[
          'inline-flex h-10 w-10',
          'items-center justify-center',
          'bg-[#4c4c4c] text-white',
          'group-data-[state=active]:bg-[#ff2200] group-data-[state=active]:text-white',
          'group-data-[disabled]:text-gray-400',
          'group-data-[state=completed]:text-white/50 group-data-[state=completed]:bg-[#ff2200]/50',
          'rounded-full shrink-0',
          'cursor-pointer'
        ]"
      >
        <StepperIndicator>
          <Icon :icon="item.props?.icon" class="h-5 w-5" />
        </StepperIndicator>
      </StepperTrigger>

      <StepperSeparator
        v-if="item.props?.step !== steps[steps.length - 1].props?.step"
        :class="[
          'block h-0.5',
          'absolute top-5 right-[calc(-50%+20px)] left-[calc(50%+30px)]',
          'bg-gray-300',
          'group-data-[disabled]:bg-gray-300',
          'group-data-[state=completed]:bg-[#ff2200]/50',
          'rounded-full shrink-0',
        ]"
      />

      <div class="mt-2 text-center text-white group-data-[state=inactive]:text-gray-300">
        <StepperTitle class="font-medium">
          {{ item.props?.title }}
        </StepperTitle>

        <StepperDescription class="hidden text-xs sm:block">
          {{ item.props?.description }}
        </StepperDescription>
      </div>
    </StepperItem>
  </StepperRoot>
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { StepperDescription, StepperIndicator, StepperItem, StepperRoot, StepperSeparator, StepperTitle, StepperTrigger } from 'radix-vue'
  import { computed, defineEmits, ref, useSlots, VNode, watch } from 'vue'
  import useEventBus from "@/composables/useEventBus"

  type StepperStep = {
    step: number
    title?: string
    description?: string
    icon: string
    disabled?: boolean
  }

  interface VNodeExtended extends VNode {
    props: StepperStep
  }

  const emit = defineEmits(['stepUpdated'])

  const { bus } = useEventBus()

  const activeStep = ref(1)

  const steps = computed(() => useSlots().default!() as VNodeExtended[])

  watch(
    () => bus.value.get("changeStep"),
    (val) => {
      const [busValue] = val ?? []
      if (busValue === 'prev')
        activeStep.value--
      else if (busValue === 'next')
        activeStep.value++
      else
        activeStep.value = busValue
    }
  )

  watch(
    activeStep,
    (newValue) => {
      emit('stepUpdated', newValue)
    }
  )
</script>
