<template>
  <header class="bg-indigo-600 text-white shadow-lg relative">
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Left: Logo + Title -->
        <div class="flex items-center space-x-2">
          <!-- App Logo -->
          <img 
            src="/icons/S-192x192.png" 
            alt="App Logo" 
            class="w-10 h-10 rounded-lg border-t-2 border-indigo-300 shadow-md transition cursor-pointer"
          />

          <div>
            <h1 class="text-[22px] font-bold">Fund Tracker</h1>            
          </div>
        </div>

        <!-- Right: Info Button -->
        <button
          type="button"
          @click="showInfo = true"
          class="w-8 h-8 flex items-center justify-center rounded-full border border-white/60 hover:bg-white/20"
        >
          <i data-feather="info" class="w-6 h-6"></i>
        </button>
      </div>
    </div>

    <!-- Info Modal -->
    <div
      v-if="showInfo"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-semibold text-indigo-700 mb-3">
          About Fund Tracker
        </h3>
        <p class="text-gray-500 mb-4">
          This application helps you track student contributions, monitor
          balances, and maintain transparent financial records.
        </p>
        <div class="flex justify-end">
          <button
            @click="showInfo = false"
            class="px-4 py-2 border border-indigo-500 border-solid text-indigo-600 rounded-lg hover:bg-indigo-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      showInfo: false
    }
  },
  methods: {
    toggleDarkMode() {
      document.documentElement.classList.toggle("dark")
      if (document.documentElement.classList.contains("dark")) {
        localStorage.setItem("theme", "dark")
      } else {
        localStorage.setItem("theme", "light")
      }
    }
  },
  mounted() {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark")
    }
    // Replace feather icons
    if (window.feather) {
      window.feather.replace()
    }
  }
}
</script>
