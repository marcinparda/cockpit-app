import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { createRouter, createWebHistory, Router } from 'vue-router';
import LogoutButton from './LogoutButton.vue';

// Mock the Button component from vue-ui
vi.mock('@cockpit-app/shared/vue-ui', () => ({
  Button: {
    name: 'Button',
    template:
      '<button v-bind="$attrs" @click="$emit(\'click\')"><slot /></button>',
    emits: ['click'],
  },
}));

describe('LogoutButton', () => {
  let router: Router;
  let wrapper: VueWrapper<InstanceType<typeof LogoutButton>>;

  beforeEach(() => {
    // Create a mock router
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/login', component: { template: '<div>Login</div>' } },
      ],
    });

    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  const createWrapper = () => {
    return mount(LogoutButton, {
      global: {
        plugins: [router],
      },
    });
  };

  it('renders correctly', () => {
    wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a button with correct props', () => {
    wrapper = createWrapper();
    const button = wrapper.find('button');

    expect(button.exists()).toBe(true);
    expect(button.attributes('label')).toBe('Logout');
    expect(button.classes()).toContain('p-button-text');
  });

  it('navigates to login page when clicked', async () => {
    // Mock router.push
    const pushSpy = vi.spyOn(router, 'push');

    wrapper = createWrapper();
    const button = wrapper.find('button');

    await button.trigger('click');

    expect(pushSpy).toHaveBeenCalledWith('/login');
  });

  it('has correct component structure', () => {
    wrapper = createWrapper();

    // Check that the component template structure is correct
    expect(wrapper.html()).toContain('button');
    expect(wrapper.html()).toContain('Logout');
  });
});
