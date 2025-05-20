<template>
  <button @click="logout">Logout</button>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/auth.service';

export default defineComponent({
  name: 'LogoutButton',
  setup() {
    const router = useRouter();

    const logout = () => {
      authService.logout();
      router.push('/login');
    };

    return {
      logout,
    };
  },
});
</script>
