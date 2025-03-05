<template>
  <component :is="props.label ? Label : 'div'" :value="props.label">
    <div class="grid grid-cols-[200px_auto] gap-2 items-start">
      <InputSelect 
        placeholder="Select platform..." 
        :options="socialOptions" 
        v-model="selectValue" 
        @update:modelValue="emitTemplateValue" 
        :value="props.socialValue" 
        sort 
      />
      <InputText v-model="textValue" @update:modelValue="emitValue" :value="props.value" />
    </div>
  </component>
</template>

<script setup lang="ts">
  import { computed, defineEmits, ref, watch } from 'vue'
  import type { SocialTypeModel, SocialObjectModel } from '@/types'
  import { socialMap } from '@/composables/useSocial'

  import Label from '@/components/Label.vue'
  import InputSelect from '@/components/InputSelect.vue'
  import InputText from '@/components/InputText.vue'

  const props = defineProps<{
    label?: string
    value?: string
    socialValue?: SocialTypeModel
    availableSocialTypes?: SocialTypeModel[]
  }>()

  const emit = defineEmits(['update:value'])

  const selectValueRef = ref(props.socialValue)
  const textValueRef = ref(props.value)

  watch(() => props.socialValue, (newValue) => {
    selectValueRef.value = newValue
  })

  watch(() => props.value, (newValue) => {
    textValueRef.value = newValue
  })

  const emitTemplateValue = () => emit('update:value', {
    type: selectValueRef.value,
    iconHref: socialMap.get(selectValueRef.value!)?.icon,
    linkHref: socialMap.get(selectValueRef.value!)?.linkTemplate,
  } as SocialObjectModel)

  const emitValue = () => emit('update:value', {
    type: selectValueRef.value,
    iconHref: socialMap.get(selectValueRef.value!)?.icon,
    linkHref: textValueRef.value,
  } as SocialObjectModel)

  const selectValue = computed({
    get: () => props.socialValue,
    set: (newValue) => selectValueRef.value = newValue,
  })

  const textValue = computed({
    get: () => props.value,
    set: (newValue) => textValueRef.value = newValue
  })

  const socialOptions = computed(() => {
    const socialArr = Array.from(socialMap)

    return [
      {
        label: '',
        value: null,
        disabled: true
      },
      ...socialArr.map(([key, value]) => {
        return {
          label: value.name,
          value: key,
          disabled: props.availableSocialTypes?.find((social) => social === key) ? false : true,
        }
      })
    ] as any
  })
</script>
