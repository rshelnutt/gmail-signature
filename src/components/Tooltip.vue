<template>
  <HoverCardRoot v-model:open="hoverState" :open-delay="0" :close-delay="0">
    <HoverCardTrigger
      class="inline-block align-middle cursor-pointer shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] outline-none focus:shadow-[0_0_0_2px_white]"
      :href="href"
      :target="target"
      rel="noreferrer noopener"
    >
      <slot />
    </HoverCardTrigger>

    <HoverCardPortal>
      <HoverCardContent
        class="z-10 data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade rounded-[18px] bg-white p-2 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
        :side-offset="5"
      >
        <slot name="content"/>

        <HoverCardArrow
          class="fill-white"
          :width="8"
        />
      </HoverCardContent>
    </HoverCardPortal>
  </HoverCardRoot>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { HoverCardArrow, HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from 'radix-vue'

    defineProps<{
      href?: string
      target?: string
    }>()

    const hoverState = ref(false)
</script>

<style scoped>
    .HoverCardContent {
        animation-duration: 0.6s;
        animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    }
    .HoverCardContent[data-side="top"] {
        animation-name: slideUp;
    }
    .HoverCardContent[data-side="bottom"] {
        animation-name: slideDown;
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>