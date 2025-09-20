<template>
    <transition name="fade">
        <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-xl shadow-xl w-full max-w-md">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
                        <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
                            <i data-feather="x"></i>
                        </button>
                    </div>

                    <p class="mb-6 text-gray-700">Are you sure you want to delete this contribution from {{ contribution.studentName }}?</p>

                    <div class="flex justify-end gap-3 pt-4 border-t">
                        <button @click="closeModal" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                            Cancel
                        </button>
                        <button @click="confirmDelete" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'DeleteConfirmationModal',
    props: {
        show: Boolean,
        contribution: Object
    },
    emits: ['close', 'confirm'],
    methods: {
        closeModal() {
            this.$emit('close');
        },
        confirmDelete() {
            this.$emit('confirm');
            this.closeModal();
        }
    }
}
</script>