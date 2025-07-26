<script setup>
import { Button } from '@cockpit-app/shared/vue-ui';
import { logout } from '@cockpit-app/shared/auth';
import { environment } from '../environments/environments';

const performLogout = async () => {
  await logout();
  const redirectUrl = new URL(environment.loginUrl);
  redirectUrl.searchParams.set('redirect_uri', window.location.href);
  window.location.href = redirectUrl.toString();
};
</script>

<template>
  <Button label="Logout" class="p-button-text" @click="performLogout" />
</template>
