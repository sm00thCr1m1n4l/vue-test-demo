import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

describe('HelloWorld.vue', () => {
  it('默认slot', () => {
    const wrapper = shallowMount(Header, {
      slots: {
        default: 'header slot'
      }
    })
    expect(wrapper.text()).toMatch('header slot')
  })
})
