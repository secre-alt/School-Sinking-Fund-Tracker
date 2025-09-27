<template>
  <!-- Full page wrapper -->
  <div class="flex flex-col">
    
    <!-- Page content -->
    <main class="pb-10">
      
    </main>

    <!-- Footer -->
    <footer class="bg-indigo-600 text-indigo-300 py-4">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 text-center md:text-left">
                  
          <!-- <div>
            <h3 class="text-2xl font-bold mb-4 text-white">School Sinking Fund Tracker</h3>
            <p class="mb-3">A simple and effective system for managing student contributions.</p>
            <p class="text-sm text-gray-400">© 2025 secre-alt. All rights reserved.</p>
          </div> -->

          <!-- Contact Information -->
          <div>
            <h4 class="text-xl font-semibold mb-4 text-white">Follow me</h4>
            <ul class="space-y-3">
              <!-- <li class="flex items-center justify-center md:justify-start">
                <i data-feather="mail" class="mr-3 w-5 h-5 text-indigo-400"></i>
                <a href="mailto:rhendel145@gmail.com" class="hover:text-indigo-400 transition">rhendel145@gmail.com</a>
              </li> -->
            </ul>

            <!-- Social Media -->
            <div class="flex justify-center md:justify-start space-x-5 mt-4 text-indigo-300">
              <a href="https://facebook.com/rencruxx" target="_blank" class="hover:text-indigo-500 transition">
                <i data-feather="facebook"></i>
              </a>
              <a href="https://www.instagram.com/secre_official" target="_blank" class="hover:text-indigo-500 transition">
                <i data-feather="instagram"></i>
              </a>
              <a href="https://github.com/secre-alt" target="_blank" class="hover:text-indigo-500 transition">
                <i data-feather="github"></i>
              </a>
              <a href="https://linkedin.com/in/eldren-dela-cruz-8a0858335" target="_blank" class="hover:text-indigo-500 transition">
                <i data-feather="linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Bottom Bar -->
        <div class="border-t border-indigo-300 mt-4 pt-5 text-sm text-center text-indigo-300">
          <p>© 2025 secre-alt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  mounted() {
    if (typeof feather !== 'undefined') {
      setTimeout(() => feather.replace(), 100);
    }
  }
}
</script>
