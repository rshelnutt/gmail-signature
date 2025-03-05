<template>
  <SelectRoot v-model="modelValue">
    <SelectTrigger
      class="inline-flex h-[35px] w-full appearance-none items-center justify-between rounded-[4px] bg-[#272727] font-heading font-medium text-white px-[10px] text-[15px] leading-none outline-none"
      aria-label="Select option"
    >
      <SelectValue :placeholder="placeholder || 'Select an option...'" />
      <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        class="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] min-w-[160px] rounded bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
        :side-offset="5"
      >
        <SelectScrollUpButton class="flex h-[25px] cursor-default items-center justify-center bg-white">
          <Icon icon="radix-icons:chevron-up" />
        </SelectScrollUpButton>

        <SelectViewport class="p-[5px]">
          <template v-for="option in sortedOptions" :key="'group' in option ? option.group : option.value">
            <template v-if="'group' in option">
              <SelectLabel class="text-mauve11 px-[25px] text-xs leading-[25px]">
                {{ option.group }}
              </SelectLabel>

              <SelectGroup>
                <SelectItem
                  v-for="groupOption in option.options"
                  :key="groupOption.value"
                  :value="groupOption.value"
                  class="relative flex h-[25px] items-center rounded-[3px] pr-[35px] pl-[25px] text-[13px] leading-none select-none data-[disabled]:pointer-events-none data-[disabled]:text-gray-400 data-[highlighted]:bg-black/80 data-[highlighted]:text-white data-[highlighted]:outline-none"
                  :disabled="groupOption.disabled"
                >
                  <SelectItemIndicator class="absolute left-0 inline-flex w-[25px] items-center justify-center">
                    <Icon icon="radix-icons:check" />
                  </SelectItemIndicator>
                  <SelectItemText>{{ groupOption.label }}</SelectItemText>
                </SelectItem>
              </SelectGroup>
            </template>

            <SelectItem
              v-else
              :value="option.value"
              class="relative flex h-[25px] items-center rounded-[3px] pr-[35px] pl-[25px] text-[13px] leading-none select-none data-[disabled]:pointer-events-none data-[disabled]:text-gray-400 data-[highlighted]:bg-black/60 data-[highlighted]:text-white data-[highlighted]:outline-none"
              :disabled="option.disabled"
            >
              <SelectItemIndicator class="absolute left-0 inline-flex w-[25px] items-center justify-center">
                <Icon icon="radix-icons:check" />
              </SelectItemIndicator>
              <SelectItemText>{{ option.label }}</SelectItemText>
            </SelectItem>
          </template>
        </SelectViewport>

        <SelectScrollDownButton class="flex h-[25px] cursor-default items-center justify-center bg-white">
          <Icon icon="radix-icons:chevron-down" />
        </SelectScrollDownButton>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectLabel,
    SelectPortal,
    SelectRoot,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectTrigger,
    SelectValue,
    SelectViewport,
  } from 'radix-vue'
  import { computed, defineEmits, defineProps, ref } from 'vue'

  interface Option {
    label: string
    value: string
    disabled?: boolean
  }

  interface GroupedOption {
    group: string
    options: Option[]
  }

  type Options = (Option | GroupedOption)[]

  const props = defineProps<{
    label?: string
    name?: string
    value?: string
    options: Options
    placeholder?: string
    sort?: boolean
  }>()

  const emit = defineEmits(['update:value'])

  const value = ref(props.value)

  const sortedOptions = computed(() => {
    if (!props.sort) {
      return props.options
    }

    return props.options.map(option => {
      if ('group' in option) {
        // Handle grouped options
        const sortedGroupOptions = [...option.options].sort((a, b) => {
          if ((a.disabled && a.value !== null) && !b.disabled) return 1
          if (!a.disabled && b.disabled) return -1
          return 0
        })
        return { ...option, options: sortedGroupOptions }
      }
      return option
    }).sort((a, b) => {
      // For non-grouped options, sort by disabled status
      const aDisabled = 'disabled' in a && a.value !== null ? a.disabled : false
      const bDisabled = 'disabled' in b && b.value !== null ? b.disabled : false
      if (aDisabled && !bDisabled) return 1
      if (!aDisabled && bDisabled) return -1
      return 0
    })
  })

  const modelValue = computed({
    get: () => props.value,
    set: (newValue) => {
      emit('update:value', newValue)
      value.value = newValue
    },
  })
</script>
