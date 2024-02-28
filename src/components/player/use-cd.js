import { useStore } from 'vuex'
import { computed, watch, ref } from 'vue'

export default function useCd() {
  const cdRef = ref(null)
  const cdImageRef = ref(null)

  const store = useStore()
  const playing = computed(() => store.state.playing)
  const cdCls = computed(() => {
    return playing.value ? 'playing' : ''
  })
  watch(playing, (newPlaying) => {
    if (!newPlaying) {
      syncTransform(cdRef.value, cdImageRef.value)
    }
  })
  function syncTransform(wrapper, inner) {
    const wrapperTransform = getComputedStyle(wrapper).transform
    const innerTransform = getComputedStyle(inner).transform
    const transformValue =
      wrapperTransform === 'none' ? innerTransform : innerTransform.concat(' ', wrapperTransform)
    wrapper.style.transform = transformValue
  }
  return {
    cdCls,
    cdRef,
    cdImageRef
  }
}
