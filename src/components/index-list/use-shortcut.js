import { ref, computed } from 'vue'
export default function useShortcut(props, groupRef) {
  const ANCHOR_HEIGHT = 18
  const scrollRef = ref(null)
  const shortcutList = computed(() => {
    return props.data.map((item) => item.title)
  })
  const touch = {}
  function onShortcutTouchStart(e) {
    const anchorIndex = parseInt(e.target.dataset.index)
    touch.anchorIndex = anchorIndex
    touch.y1 = e.touches[0].pageY
    scrollTo(anchorIndex)
  }
  function onShortcutTouchMove(e) {
    touch.y2 = e.touches[0].pageY
    let delta = ((touch.y2 - touch.y1) / ANCHOR_HEIGHT) | 0
    const anchorIndex = touch.anchorIndex + delta
    scrollTo(anchorIndex)
  }
  function scrollTo(index) {
    if (isNaN(index)) return
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index))
    const anchorElement = groupRef.value.children[index]
    const scroll = scrollRef.value.scroll
    scroll.scrollToElement(anchorElement)
  }

  return {
    shortcutList,
    onShortcutTouchStart,
    onShortcutTouchMove,
    scrollRef
  }
}
