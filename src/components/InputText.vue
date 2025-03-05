<template>
  <component
      :is="props.label ? Label : 'div'"
      :value="props.label"
      :name="props.name"
      class="relative after:content-[''] after:absolute after:h-[2px] after:w-0 after:left-0 after:bottom-0 after:bg-red-500 after:transition-all after:duration-300 after:ease-out-expo focus-within:after:w-full"
      labelClass="pl-[10px]"
      :theme="props.theme"
    >
    <input 
      :id="props.name ?? undefined" 
      class="inline-flex h-[35px] w-full appearance-none items-center justify-center px-[10px] text-[15px] leading-none outline-none transition-color duration-300 ease-out-expo"
      :class="themeClass[props.theme]"
      :placeholder="props.placeholder"
      type="text" 
      v-model="modelValue" 
    />
  </component>

</template>

<script setup lang="ts">
  import Label from '@/components/Label.vue'
  import { computed, ref } from 'vue'

  const props = withDefaults(defineProps<{
    modelValue?: string
    label?: string
    name?: string
    placeholder?: string
    theme?: 'dark' | 'light'
  }>(), {
    theme: 'dark'
  })

  const emit = defineEmits(['update:modelValue'])

  const value = ref(props.modelValue)

  const modelValue = computed({
    get: () => props.modelValue,
    set: (newValue) => {
      emit('update:modelValue', newValue)
      value.value = newValue
    },
  })

  const themeClass = {
    'dark': 'bg-transparent focus:bg-black/40 text-[#DADADA] border-b-2 border-white/30 hover:border-white selection:bg-white selection:text-ba-black',
    'light': 'bg-transparent focus:bg-white/20 text-black border-b-2 border-black/30 hover:border-black selection:bg-ba-red selection:text-white'
  }
</script>
