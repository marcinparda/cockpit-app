<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/auth.service';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const apiKey = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleLogin = () => {
  if (apiKey.value.trim()) {
    authService.setApiKey(apiKey.value.trim());
    router.push('/shopping-list');
  } else {
    errorMessage.value = 'API Key is required';
  }
};
</script>

<template>
  <div>
    <div>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="apiKey">API Key</label>
          <InputText
            id="apiKey"
            v-model="apiKey"
            type="text"
            placeholder="Enter your API Key"
            required
          />
        </div>
        <Button type="submit" label="Login" style="width: 100%" />
        <p v-if="errorMessage" style="text-align: center">
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </div>
</template>
