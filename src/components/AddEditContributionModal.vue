<template>
    <transition name="fade">
        <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-xl shadow-xl w-full max-w-md">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">
                            {{ editingContribution ? 'Edit Contribution' : 'Add New Contribution' }}
                        </h3>
                        <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
                            <i data-feather="x"></i>
                        </button>
                    </div>

                    <form @submit.prevent="saveContribution">
                        <div class="mb-4">
                            <label for="fundCategory" class="block text-sm font-medium text-gray-700 mb-1">Fund Category</label>
                            <div class="relative">
                                <select v-model="newContribution.fundCategory" id="fundCategory" class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required>
                                    <option value="" disabled selected>Select category</option>
                                    <option v-for="category in fundCategories" :value="category">{{ category }}</option>
                                    <option value="_new">+ Add new category</option>
                                </select>
                            </div>
                            <div v-if="newContribution.fundCategory === '_new'" class="mt-2">
                                <input v-model="newCategory" type="text" placeholder="Enter new category name" class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="studentName" class="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                            <input v-model="newContribution.studentName" type="text" id="studentName" placeholder="Enter student name" class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required>
                        </div>

                        <div class="mb-4">
                            <label for="date" class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input v-model="newContribution.date" type="date" id="date" class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required>
                        </div>

                        <div class="mb-4">
                            <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">Amount (₱)</label>
                            <input v-model="newContribution.amount" type="number" id="amount" placeholder="Enter amount" min="1" class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required>
                        </div>

                        <div class="flex justify-end gap-3 pt-4 border-t">
                            <button type="button" @click="closeModal" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                                Cancel
                            </button>
                            <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                                {{ editingContribution ? 'Update' : 'Save' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'AddEditContributionModal',
    props: {
        show: Boolean,
        editingContribution: Boolean,
        contribution: Object,
        fundCategories: Array
    },
    emits: ['close', 'save', 'add-category'],
    data() {
        return {
            newContribution: {
                id: null,
                studentName: '',
                fundCategory: '',
                date: new Date().toISOString().split('T')[0],
                amount: '',
                runningBalance: 0
            },
            newCategory: ''
        };
    },
    watch: {
        contribution: {
            handler(newVal) {
                if (newVal) {
                    this.newContribution = {...newVal};
                } else {
                    this.resetForm();
                }
            },
            immediate: true
        }
    },
    methods: {
        saveContribution() {
            // Handle new category
            if (this.newContribution.fundCategory === '_new' && this.newCategory) {
                this.$emit('add-category', this.newCategory);
                this.newContribution.fundCategory = this.newCategory;
            }

            this.$emit('save', {...this.newContribution});
            this.resetForm();
        },
        resetForm() {
            this.newContribution = {
                id: null,
                studentName: '',
                fundCategory: '',
                date: new Date().toISOString().split('T')[0],
                amount: '',
                runningBalance: 0
            };
            this.newCategory = '';
        },
        closeModal() {
            this.$emit('close');
            this.resetForm();
        }
    }
}
</script>