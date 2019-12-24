declare module '*.vue' {
  import Vue, { ComponentOptions } from 'vue'
  const component: ComponentOptions<any>
  export default component
}
