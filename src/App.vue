<template>
  <main>
    <img :src="BASigLogo" class="[.is-scrollable_&]:pl-[0px] min-h-[50px] h-[7.5dvh] fixed top-[calc((18dvh-7.5dvh)/2)] left-[50dvw] -translate-x-[50%]" ref="logoRef" />
    <div class="h-[18dvh]" />
    <SignatureBuilder />
  </main>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
  import BASigLogo from '@/assets/ba-sig-logo.svg'
  import SignatureBuilder from '@/components/SignatureBuilder/SignatureBuilder.vue'
  import { useScrollFade } from './composables/useScrollFade';
  
  const logoRef = ref(null);

  useScrollFade(logoRef, {
    fadeStartDistance: 0,  
    fadeDistance: 120
  });

  const contentExceedsViewport = ref(false);

  const updateOverflowClass = (mutationList: any) => {
    if (!mutationList || mutationList.length === 0) return;
    contentExceedsViewport.value = mutationList[0].contentRect?.height > window.innerHeight;
  };

  const updateOverflowClassFromMutation = () => {
    if (document.querySelector('[data-radix-focus-guard]')) {
      return contentExceedsViewport.value = false;
    }
  };

  watch(contentExceedsViewport, (newValue) => {
    if (newValue) {
      document.body.classList.add('is-scrollable');
    } else {
      document.body.classList.remove('is-scrollable');
    }
  }, { immediate: true });

  // Observers
  let resizeObserver: ResizeObserver;
  let mutationObserver: MutationObserver;

  onMounted(() => {
    resizeObserver = new ResizeObserver(updateOverflowClass);
    resizeObserver.observe(document.body);

    mutationObserver = new MutationObserver(updateOverflowClassFromMutation);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
  
  onUnmounted(() => {
    resizeObserver?.disconnect();
    mutationObserver?.disconnect();
  });
</script>