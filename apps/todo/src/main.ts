import { primeVuePlugin, Tooltip } from '@cockpit-app/shared-vue-ui';
import router from './router';
import { createApp } from 'vue';
import App from './app/App.vue';
import './styles.css';
import 'primeicons/primeicons.css';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(primeVuePlugin);
app.directive('tooltip', Tooltip);
app.mount('#root');
