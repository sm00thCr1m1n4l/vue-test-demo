import * as components from '@/components'
import * as directivies from '@/directivies'
import { PluginFunction } from 'vue'
const install: PluginFunction<{}> = (Vue, options) => {
  Object.values(components).forEach(c => {
    Vue.component(c.name as string, c)
  })
  Object.values(directivies).forEach(d => {
    console.log(d)
    Vue.use(d)
  })
}
const Component = {
  install
}
export default Component
export * from '@/components'
export * from '@/directivies'
