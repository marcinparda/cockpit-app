import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from './Button.vue';

describe('Button', () => {
  it('renders the PrimeVue Button', () => {
    const wrapper = mount(Button);
    expect(wrapper.findComponent({ name: 'Button' }).exists()).toBe(true);
  });

  it('renders slot content', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me',
      },
    });
    expect(wrapper.text()).toContain('Click me');
  });
});
