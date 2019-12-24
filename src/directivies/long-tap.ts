import Vue, { DirectiveOptions, PluginFunction } from 'vue'
const name = 'longtap'
const longTap:DirectiveOptions = {
  name,
  install: (Vue, options) => {
    Vue.directive(name, longTap)
  },
  bind: (el, binding) => {
    let timer:number
    const clearListener = () => {
      el.removeEventListener('touchend', handleEnd)
      el.removeEventListener('touchcancel', handleEnd)
    }
    const handleEnd = () => {
      clearTimeout(timer)
      clearListener()
    }
    const handlStart = () => {
      el.addEventListener('touchend', handleEnd)
      el.addEventListener('touchcancel', handleEnd)
      timer = setTimeout(() => {
        binding.value.handler()
        clearListener()
      }, binding.value.timeout)
    }
    el.addEventListener('touchstart', handlStart)
  }
}
export default longTap
