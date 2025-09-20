import { createApp } from 'vue';
import App from './App.vue';

// Import global CSS
import './assets/main.css';

// Create and mount the app
const app = createApp(App);
app.mount('#app');

// Initialize feather icons after mount
if (typeof feather !== 'undefined') {
  // Replace icons initially
  feather.replace();
  
  // Set up a mutation observer to replace icons when DOM changes
  const observer = new MutationObserver(() => {
    feather.replace();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}