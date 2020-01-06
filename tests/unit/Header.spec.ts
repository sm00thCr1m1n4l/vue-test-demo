import { shallowMount } from '@vue/test-utils'
import Header from '@/components/header.vue'
import { expect } from 'chai'
describe('HelloWorld.vue', () => {
  it('默认slot', () => {
    const wrapper = shallowMount(Header, {
      slots: {
        default: 'header slot'
      }
    })
    expect(wrapper.text()).equal('header slot')
  })
})
