<template>
  <div
    class="relative isolate inline-flex h-[56px] w-[300px] cursor-crosshair items-center justify-center overflow-hidden rounded-lg border-2 border-[#979797] bg-[linear-gradient(130deg,#011c0f_0%,#03532c_20%,#012213_40%,#054f2c_60%,#012513_80%,#033d22_100%)] px-4 py-[0.25rem] shadow-[inset_0px_0px_30px_#000402] drop-shadow-lg select-none"
  >
    <!-- Grid -->
    <div
      :class="[
        'absolute inset-0',
        '[background-image:linear-gradient(to_right,rgb(5_223_114/8%)_1px,_transparent_1px),_linear-gradient(to_bottom,rgb(5_223_114/8%)_1px,_transparent_1px)]',
        'bg-center',
        'bg-[size:26px_28px]',
        'z-30',
      ]"
    />

    <!-- Radar Ping -->
    <div
      :class="[
        'flex items-center justify-center',
        'absolute top-1/2 left-1/2',
        '-translate-x-1/2 -translate-y-1/2',
        'rounded-full',
        'z-10',
        'after:content-[\'\']',
        'after:h-[1px] after:w-[1px]',
        'after:absolute',
        'after:rounded-full',
        'after:bg-[radial-gradient(transparent_40%,#00e83b_70%,#00e83b_100%)]',
        'after:animate-ripple after:delay-[4s]',
      ]"
    />

    <!-- Radar Scan -->
    <div
      :class="[
        'h-[150px] w-[150px]',
        'absolute top-1/2 left-1/2',
        '-translate-x-1/2 -translate-y-1/2',
        'rounded-full',
        'bg-[conic-gradient(transparent_80%,rgb(0_232_59/40%))]',
        'animate-scan',
        'z-20',
      ]"
    />

    <!-- Crosshairs -->
    <div class="absolute inset-0 z-40 overflow-hidden rounded-lg" ref="crossContainerRef">
      <div ref="crossHRef" class="t-0 l-0 border-ba-green/50 pointer-events-none fixed w-full border-t border-l border-dotted" />
      <div ref="crossVRef" class="t-0 l-0 border-ba-green/50 pointer-events-none fixed h-full border-t border-l border-dotted" />
      <span ref="crossPosRef" class="text-ba-green/80 font-pixel absolute top-0 left-0 text-[3px] [--webkit-font-smoothing:none]">0,0</span>
    </div>

    <!-- Text -->
    <p class="text-ba-green font-digital relative z-50 text-[2rem] [text-shadow:0_0_2px_rgba(0_0_0/0.3),0_0_5px_rgba(0,0,0,0.4),0_0_8px_#05df72,0_0_12px_#05df72]">
      All Systems Go
    </p>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue'

  const crossContainerRef = ref<HTMLElement>()
  const crossHRef = ref<HTMLElement>()
  const crossVRef = ref<HTMLElement>()
  const crossPosRef = ref<HTMLElement>()

  const handleMouseMove = (event: MouseEvent) => {
    if (!crossHRef.value || !crossVRef.value || !crossContainerRef.value || !crossPosRef.value) return

    const rect = crossContainerRef.value.getBoundingClientRect()

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    crossHRef.value.style.top = `${y}px`
    crossVRef.value.style.left = `${x}px`

    crossPosRef.value.textContent = `${Math.floor(x)},${Math.floor(y)}`
    crossPosRef.value.style.left = `${x + 10}px`
    crossPosRef.value.style.top = `${y - 10}px`
  }

  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
  })
</script>
