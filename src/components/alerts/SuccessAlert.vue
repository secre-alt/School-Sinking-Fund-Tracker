<template>
  <!-- This component doesn't render anything, it just provides methods -->
</template>

<script>
export default {
  name: 'SuccessAlert',
  methods: {
    showSuccess(title, message) {
      Swal.fire({
        title: title,
        text: message,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }
  }
}
</script>