<template>
   <header class="bg-indigo-500 bg-gradient-to-b from-[#5a5bd8] to-[#d993ff80] text-white shadow-lg">
        <div class="container mx-auto px-4 py-3">
            <div class="flex items-center space-x-3">

                 <!-- Logo Button -->
                <button 
                @click="toggleDarkMode"
                class="focus:outline-none"
                >
                <img 
                    src="/icons/S-192x192.png" 
                    alt="App Logo" 
                    class="w-16 h-16 rounded-lg border-t-2 border-indigo-300 shadow-md transition cursor-pointer"
                />
                </button>

                <div>
                    <h1 class="text-[30px] font-bold">Fund Tracker</h1>
                    <p class="text-[15px] text-indigo-100">Track student Contributions</p>
                </div>
            </div>
        </div>
   </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    toggleDarkMode() {
      document.documentElement.classList.toggle("dark")
      // Optional: save preference
      if (document.documentElement.classList.contains("dark")) {
        localStorage.setItem("theme", "dark")
      } else {
        localStorage.setItem("theme", "light")
      }
    }
  },
  mounted() {
    // Apply saved preference
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark")
    }
  }
}
</script>
