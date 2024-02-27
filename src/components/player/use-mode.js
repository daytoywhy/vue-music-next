import { PLAY_MODE } from '@/assets/js/constant'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
export default function useMode() {
  const store = useStore()
  const playMode = computed(() => store.state.playMode)
  const modeIcon = computed(() => {
    const playModeVal = playMode.value
    return playModeVal === PLAY_MODE.sequence
      ? 'icon-sequence'
      : playModeVal === PLAY_MODE.random
        ? 'icon-random'
        : 'icon-loop'
  })
  function changeMode() {
    const playModeVal = playMode.value
    const mode = (playModeVal + 1) % 3
    store.dispatch('changeMode', mode)
  }
  return {
    modeIcon,
    changeMode
  }
}
