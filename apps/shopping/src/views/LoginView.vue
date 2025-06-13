<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/auth.service';
import { Button, InputText } from '@cockpit-app/shared/vue-ui';

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
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="apiKey">API Key:</label>
        <InputText
          id="apiKey"
          v-model="apiKey"
          type="text"
          placeholder="Enter your API Key"
          required
        />
      </div>
      <Button type="submit"> Login </Button>
      <p v-if="errorMessage">
        {{ errorMessage }}
      </p>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

form {
  display: flex;
  flex-direction: column;
}

div {
  margin-bottom: 1rem;
}

label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

button {
  padding: 0.5rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  color: red;
  text-align: center;
}
</style>
