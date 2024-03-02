import BScroll from 'better-scroll'
import { ref, onMounted, onUnmounted,onActivated,onDeactivated } from 'vue'

export default function useScroll(rootRef, options, emit) {
  const scroll = ref(null)
  onMounted(() => {
    scroll.value = new BScroll(rootRef.value, {
      observeDOM: true,
      ...options
    })
    scroll.value.on('scroll', (pos) => {
      emit('scroll', pos)
    })
  })
  onUnmounted(() => {
    scroll.value.destroy()
  })
  onActivated(() => {
    scroll.value.enable()
    scroll.value.refresh()
  })

  onDeactivated(() => {
    scroll.value.disable()
  })
  return {
    scroll
  }
}
