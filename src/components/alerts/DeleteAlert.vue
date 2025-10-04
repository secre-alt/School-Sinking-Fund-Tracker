<template>
  <!-- You don’t need a custom modal anymore -->
</template>

<script>
export default {
  name: 'DeleteAlert',
  methods: {
    async confirmDelete(contribution) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `Delete contribution from ${contribution.studentName}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      });

      return result.isConfirmed; // true if confirmed, false if cancelled
    },
    
    showSuccess(message) {
      Swal.fire({
        title: 'Deleted!',
        text: message,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    },
    
    showError(message) {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
}
</script>
