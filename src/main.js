import { createApp } from 'vue'
import App from './App.vue'
import feather from 'feather-icons'

// Global CSS
import './assets/main.css'
import './assets/fonts.css'
import "tailwindcss";

// JS Libraries
import Chart from 'chart.js/auto'
import Swal from 'sweetalert2'

// Make them available globally if needed
window.Chart = Chart
window.Swal = Swal

// Create and mount app
const app = createApp(App)
app.mount('#app')

// Feather icons setup
if (typeof feather !== 'undefined') {
  feather.replace()
  const observer = new MutationObserver(() => feather.replace())
  observer.observe(document.body, { childList: true, subtree: true })
}

// Service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (reg) => console.log('✅ Service Worker registered', reg),
      (err) => console.log('❌ Service Worker failed', err)
    )
  })
}
