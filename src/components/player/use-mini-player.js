import { useStore } from 'vuex'
import { computed, ref, watch, nextTick, onMounted, onUnmounted,onActivated,onDeactivated } from 'vue'
import BScroll from 'better-scroll'

export default function useMiniPlayer() {
  const sliderWrapperRef = ref(null)
  const slider = ref(null)

  const store = useStore()
  const currentIndex = computed(() => store.state.currentIndex)
  const fullScreen = computed(() => store.state.fullScreen)
  const playlist = computed(() => store.state.playlist)

  const sliderShow = computed(() => {
    return !fullScreen.value && !!playlist.value.length
  })

  onMounted(() => {
    let sliderVal
    watch(sliderShow, async (newSliderShow) => {
      if (newSliderShow) {
        await nextTick()
        if (!sliderVal) {
          sliderVal = slider.value = new BScroll(sliderWrapperRef.value, {
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: false,
            bounce: false,
            probeType: 2,
            slide: {
              autoplay: false,
              loop: true
            }
          })
          sliderVal.on('slidePageChanged', ({ pageX }) => {
            store.commit('setCurrentIndex', pageX)
          })
        } else {
          sliderVal.refresh()
        }
        sliderVal.goToPage(currentIndex.value, 0, 0)
      }
    })
    watch(currentIndex, (newIndex) => {
      if (sliderVal && sliderShow.value) {
        sliderVal.goToPage(newIndex, 0, 0)
      }
    })
    watch(playlist, async (newPlaylist) => {
      if (sliderVal && sliderShow.value && newPlaylist.length) {
        await nextTick()
        sliderVal.refresh()
      }
    })
  })
  onUnmounted(() => {
    if (slider.value) {
      slider.value.destroy()
    }
  })

  onActivated(() => {
    slider.value.enable()
    slider.value.refresh()
  })

  onDeactivated(() => {
    slider.value.disable()
  })
  return {
    slider,
    sliderWrapperRef
  }
}
