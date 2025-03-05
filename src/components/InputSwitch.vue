<template>
  <div class="flex items-center gap-4">
    <label 
      class="text-xs leading-[1.5em] font-semibold font-heading uppercase tracking-[0.06rem] text-white pl-[10px] select-none" 
      :for="name ?? id" v-if="label"
    >
      {{ label }}
    </label>

    <SwitchRoot
      :id="id"
      v-model:checked="value"
      :class="[
        'relative flex',
        'h-[19px] w-[38px] rounded-full',
        'bg-black/80 data-[state=checked]:bg-[#d81d00] shadow-lg',
        'cursor-pointer shadow-sm',
        'shadow transition-colors duration-300 ease-out',
      ]"
    >
      <SwitchThumb
        :class="[
          'block',
          'h-[15px] w-[15px] rounded-full',
          'my-auto',
          'bg-white',
          'translate-x-0.5 data-[state=checked]:translate-x-[19px]',
          'transition-all duration-300 will-change-transform',
          'z-10 shadow-sm',
        ]"
      />
    </SwitchRoot>
  </div>
</template>

<script setup lang="ts">
  import { SwitchRoot, SwitchThumb } from 'radix-vue'
  import { ref, watch, useId } from 'vue'

  const props = defineProps<{
    label?: string
    name?: string
    modelValue: boolean
  }>()

  const emit = defineEmits(['update:modelValue']) 

  const value = ref(!!props.modelValue)
  const id = useId()

  // Watch for internal changes
  watch(value, newValue => {
    emit('update:modelValue', newValue)
  })

  // Watch for external changes to modelValue
  watch(() => props.modelValue, newValue => {
    value.value = !!newValue
  })
</script>
