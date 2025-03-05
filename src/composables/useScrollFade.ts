import { ref, onMounted, onUnmounted, type Ref } from 'vue'

interface ScrollFadeOptions {
  fadeStartDistance?: number
  fadeDistance?: number
}

export function useScrollFade(targetRef: Ref<HTMLElement | null>, options: ScrollFadeOptions = {}) {
  const opacity = ref(1)
  const {
    fadeStartDistance = 100,
    fadeDistance = 200
  } = options

  const handleScroll = () => {
    if (!targetRef.value) return

    const scrollPosition = window.scrollY

    if (scrollPosition <= fadeStartDistance) {
      opacity.value = 1 // Element is fully visible
    } else if (scrollPosition >= fadeStartDistance + fadeDistance) {
      opacity.value = 0 // Element is fully faded out
    } else {
      opacity.value = 1 - (scrollPosition - fadeStartDistance) / fadeDistance
    }

    // Apply the opacity to the element
    targetRef.value.style.opacity = opacity.value.toString()
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    // Initial calculation
    handleScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    opacity
  }
}