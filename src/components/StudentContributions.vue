<template>
    <section class="mb-12">
        <div class="bg-white rounded-xl shadow-md p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-semibold text-gray-800">Student Contributions</h2>
                <div class="flex gap-2">
                    <button @click="$emit('add-contribution')" class="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-indigo-700 transition">
                        <i data-feather="plus"></i>
                        Add Contribution
                    </button>
                </div>
            </div>

            <div class="mb-4 flex flex-col sm:flex-row gap-4">
                <div class="relative flex-grow">
                    <input v-model="searchQuery" type="text" placeholder="Search students..." class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <i data-feather="search" class="absolute left-3 top-2.5 text-gray-400"></i>
                </div>
                <select v-model="filterCategory" class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">All Categories</option>
                    <option v-for="category in fundCategories" :value="category">{{ category }}</option>
                </select>
            </div>

            <ContributionTable 
                :contributions="contributions"
                :search-query="searchQuery"
                :filter-category="filterCategory"
                :sort-column="sortColumn"
                :sort-direction="sortDirection"
                @edit-contribution="$emit('edit-contribution', $event)"
                @add-funds="$emit('add-funds', $event)"
                @delete-contribution="$emit('delete-contribution', $event)"
                @update:sortColumn="sortColumn = $event"
                @update:sortDirection="sortDirection = $event"
            />
        </div>
    </section>
</template>

<script>
import ContributionTable from './ContributionTable.vue';

export default {
    name: 'StudentContributions',
    components: { ContributionTable },
    props: {
        contributions: Array,
        fundCategories: Array
    },
    emits: ['add-contribution', 'edit-contribution', 'add-funds', 'delete-contribution'],
    data() {
        return {
            searchQuery: '',
            filterCategory: '',
            sortColumn: 'date',
            sortDirection: 'desc'
        };
    }
}
</script>