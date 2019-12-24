import * as _Vue from 'vue'
declare module 'vue'{
  export interface DirectiveOptions{
      name:string
      install:_Vue.PluginFunction<any>
  }
}
