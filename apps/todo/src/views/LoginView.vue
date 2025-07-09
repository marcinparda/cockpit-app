<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/auth.service';
import { InputText, Button, Card } from '@cockpit-app/shared/vue-ui';

const apiKey = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleLogin = () => {
  if (apiKey.value.trim()) {
    authService.setApiKey(apiKey.value.trim());
    router.push('/todo-list');
  } else {
    errorMessage.value = 'API Key is required';
  }
};
</script>

<template>
  <div class="pt-12 max-w-xl mx-auto">
    <Card>
      <template #title>
        <div class="pb-6">Login Form</div>
      </template>
      <template #content>
        <form @submit.prevent="handleLogin">
          <div class="flex flex-col pb-8">
            <label for="apiKey" class="pb-1"
              >Enter your API Key to log in</label
            >
            <InputText
              id="apiKey"
              v-model="apiKey"
              aria-describedby="apiKey-help"
            />
          </div>
          <Button type="submit" label="Login" class="w-full" />
        </form>
      </template>
    </Card>
  </div>
</template>
