<script setup>
import { useRouter } from 'vue-router';
import { authService } from '../services/auth.service';
import { Button } from '@cockpit-app/shared/vue-ui';

const router = useRouter();

const logout = () => {
  authService.logout();
  router.push('/login');
};
</script>

<template>
  <Button @click="logout"> Logout </Button>
</template>
