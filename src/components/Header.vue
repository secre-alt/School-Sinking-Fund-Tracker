<template>
   <header class="bg-indigo-700 bg-gradient-to-b from-[#5a5bd8] to-[#d993ff99] text-white shadow-lg">
        <div class="container mx-auto px-4 py-3">
            <div class="flex items-center space-x-3">

              <!-- App Logo -->
                <img 
                    src="/icons/S-192x192.png" 
                    alt="App Logo" 
                    class="w-10 h-10 rounded-lg border-t-2 border-indigo-300 shadow-md transition cursor-pointer"
                />
              

                <div>
                    <h1 class="text-[20px] font-bold">Fund Tracker</h1>
                    <p class="text-[12px] text-indigo-100">Track student Contributions</p>
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
