import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Header, {
      slots: {
        default: 'header slot'
      }
    })
    expect(wrapper.text()).toMatch('header slot')
  })
})
