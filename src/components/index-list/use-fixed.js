import { ref, computed, watch, nextTick } from 'vue'
export default function useFixed(props) {
  const HEIGHT = 30
  const groupRef = ref(null)
  const listHeights = ref([])
  const scrollY = ref(0)
  const currentIndex = ref(0)
  const distance = ref(0)

  watch(
    () => props.data,
    async () => {
      await nextTick()
      calclate()
    }
  )
  const fixedStyle = computed(() => {
    const distanceVal = distance.value
    const diff = distanceVal > 0 && distanceVal < HEIGHT ? distanceVal - HEIGHT : 0
    return {
      transform: `translate3d(0,${diff}px,0)`
    }
  })
  const fixedTitle = computed(() => {
    if (scrollY.value < 0) return ''
    const currentGroup = props.data[currentIndex.value]
    return currentGroup ? currentGroup.title : ''
  })
  watch(scrollY, (newY) => {
    let listHeightsVal = listHeights.value
    for (let i = 0; i < listHeightsVal.length - 1; i++) {
      let heightTop = listHeightsVal[i]
      let heightBottom = listHeightsVal[i + 1]
      if (newY >= heightTop && newY <= heightBottom) {
        currentIndex.value = i
        distance.value = heightBottom - newY
      }
    }
  })
  function calclate() {
    const list = groupRef.value.children
    const listHeightsVal = listHeights.value
    listHeightsVal.length = 0

    let height = 0
    listHeightsVal.push(height)
    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHeightsVal.push(height)
    }
  }

  function onScroll(pos) {
    scrollY.value = -pos.y
  }
  return {
    groupRef,
    onScroll,
    fixedTitle,
    currentIndex,
    fixedStyle
  }
}
