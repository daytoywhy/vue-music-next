import BScroll from "better-scroll";
import { ref,onMounted,onUnmounted } from "vue"

export default function useScroll (rootRef,options,emit){
  const scroll = ref(null)
  onMounted(()=>{
    scroll.value = new BScroll(rootRef.value,{
      observeDOM:true,
      ...options
    })
    scroll.value.on('scroll',(pos)=>{
      emit('scroll',pos)
    })
  })
 onUnmounted(()=>{
  scroll.value.destroy()
 })
  return {
    scroll
  }
}