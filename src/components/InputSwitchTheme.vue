<template>
  <SwitchRoot
    v-model:checked="value"
    :class="[
      'relative flex',
      'h-[25px] w-[50px] rounded-full',
      'bg-[#232323] data-[state=checked]:bg-white',
      'border border-[#6d6d6d] data-[state=checked]:border-[#E3E6EB]',
      'cursor-pointer shadow-sm',
      'transition-colors ease-out duration-300 shadow'
    ]"
  >
    <Icon :class="{ 'animate-swing': value }" class="text-[#FFBB52] text-lg absolute top-1/2 left-1 origin-top -translate-y-1/2" icon="heroicons:sun-solid" />

    <SwitchThumb
      :class="[
        'block',
        'h-[19px] w-[19px] rounded-full',
        'my-auto',
        'border-2 border-[#b1b3e3] data-[state=checked]:border-[#FFBC53]',
        'bg-[#36374f] data-[state=checked]:bg-[#FFDDA9]',
        'translate-x-0.5 data-[state=checked]:translate-x-[27px]',
        'transition-all duration-300 will-change-transform',
        'shadow-sm z-10',
      ]"
    />

    <Icon :class="{ 'animate-swing': !value }" class="text-[#b1b3e3] text-lg absolute top-1/2 right-1 origin-top -translate-y-1/2" icon="heroicons:moon-16-solid" />
  </SwitchRoot>
</template>

<script setup lang="ts">
  import { ref, defineEmits, watch } from 'vue'
  import { Icon } from '@iconify/vue'
  import { SwitchRoot, SwitchThumb } from 'radix-vue'
  
  const props = defineProps<{
    modelValue: boolean
  }>()

  const emit = defineEmits(['update:modelValue']) 

  const value = ref(!!props.modelValue)

  // Watch for internal changes
  watch(value, newValue => {
    emit('update:modelValue', newValue)
  })

  // Watch for external changes to modelValue
  watch(() => props.modelValue, newValue => {
    value.value = !!newValue
  })
</script>
