import Vue from 'vue'
import App from './App.vue'
import Component from '../src'
Vue.use(Component)
const vm = new Vue({
  el: '#app',
  render (h) {
    // @ts-ignore
    return h(App)
  }
})
