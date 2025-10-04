<template>
  <button @click="handleDelete(contribution)">
    Delete
  </button>
</template>

<script>
import DeleteAlert from './DeleteAlert.vue'

export default {
  components: { DeleteAlert },
  data() {
    return {
      contribution: { studentName: 'Juan Dela Cruz' }
    }
  },
  methods: {
    async handleDelete(contribution) {
      const confirmed = await this.$refs.deleteAlert.confirmDelete(contribution);

      if (confirmed) {
        try {
          // perform your delete action here
          this.$refs.deleteAlert.showSuccess('Contribution deleted successfully.');
        } catch (error) {
          this.$refs.deleteAlert.showError('Failed to delete contribution.');
        }
      }
    }
  }
}
</script>

<DeleteAlert ref="deleteAlert" />
