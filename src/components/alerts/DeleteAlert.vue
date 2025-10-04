<template>
 
</template>

<script>
export default {
  name: 'DeleteAlert',
  methods: {
    confirmDelete(contribution) {
      return Swal.fire({
        title: 'Are you sure?',
        text: `Delete contribution from ${contribution.studentName}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      });
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