<template>
  <div class="grid h-[150px] w-[150px] place-items-center box-content rounded-[1px] border-[5px] border-[#2F2F2F] outline-white/40 outline-[2px] outline-solid p-4 bg-[#131313]">
    <div class="h-[114px] w-[114px] grid place-items-center">
      <img :src="previewSrc" v-if="previewSrc" />
      <Icon icon="icon-park-twotone:avatar" class=" w-[100px] h-[100px] text-[#3F3F3F]" v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
    import { Icon } from '@iconify/vue'

    const props = defineProps<{
      previewSrc: string
    }>()

    const previewSrc = computed(() => props.previewSrc)
</script>
