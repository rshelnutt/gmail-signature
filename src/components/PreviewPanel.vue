<template>
  <Card 
    :variant="isLightMode ? 'light' : 'dark'" 
    class="m-[10px] outline-[10px] outline-white/[0.125] flex-grow"
    :class="{ '!bg-[#171717]': !isLightMode }"
  >
    <div class="absolute top-0 right-0 z-10 m-5">
      <InputSwitchTheme v-model="isLightMode" />
    </div>
    <slot :isLightMode="isLightMode" />
  </Card>
</template>

<script setup lang="ts">
  import Card from '@/components/Card.vue'
  import InputSwitchTheme from '@/components/InputSwitchTheme.vue'
  import { ref } from 'vue'

  const isLightMode = ref(false)

  defineExpose({
    isLightMode
  });
</script>
