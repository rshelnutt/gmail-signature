import { ref } from "vue"

const bus = ref(new Map())

export default function useEventsBus() {
  function emitBus(event: string, value: any) {
    bus.value.set(event, [value])
  }

  return {
    emitBus,
    bus
  }
}
