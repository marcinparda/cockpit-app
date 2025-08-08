<script setup>
  import { Button } from '@cockpit-app/shared-vue-ui';
  import { logout } from '@cockpit-app/common-shared-data-access';
  import { environments } from '@cockpit-app/shared-utils';

  const performLogout = async () => {
    await logout();
    const redirectUrl = new URL(environments.loginUrl);
    redirectUrl.searchParams.set('redirect_uri', window.location.href);
    window.location.href = redirectUrl.toString();
  };
</script>

<template>
  <Button
    label="Logout"
    variant="text"
    severity="danger"
    class="p-button-text"
    @click="performLogout"
  />
</template>
