<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="apiKey">API Key:</label>
        <input
          id="apiKey"
          v-model="apiKey"
          type="text"
          placeholder="Enter your API Key"
          required
        />
      </div>
      <button type="submit">Login</button>
      <p v-if="errorMessage">
        {{ errorMessage }}
      </p>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/auth.service';

export default defineComponent({
  name: 'LoginPage',
  setup() {
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

    return {
      apiKey,
      errorMessage,
      handleLogin,
    };
  },
});
</script>
