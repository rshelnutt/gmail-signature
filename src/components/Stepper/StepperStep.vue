<template>
    <slot />
</template>

<script setup lang="ts">
  type StepperStep = {
    step: number
    title: string
    description: string
    icon: string
  }

  defineProps<StepperStep>()
</script>
