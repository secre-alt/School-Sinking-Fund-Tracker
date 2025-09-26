<template>
    <section class="mb-12">
        <div class="bg-white rounded-xl shadow-md p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-semibold text-gray-800">Student Contributions</h2>
                <div class="flex gap-2">
                    <button @click="$emit('add-contribution')" class="bg-indigo-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium flex items-center 
                    gap-1 sm:gap-2 hover:bg-indigo-700 transition text-sm sm:text-base w-full xs:w-auto justify-center">
                        <i data-feather="plus" class="w-3 h-3 sm:w-4 sm:h-4"></i>
                        Add Contribution
                    </button>
                </div>
            </div>

            <!-- Controls Section -->
            <div class="mb-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <!-- Show Entries Dropdown -->
                <div class="flex items-center gap-2">
                    <label for="show-entries" class="text-sm text-gray-600">Show</label>
                    <select 
                        v-model="perPage" 
                        id="show-entries" 
                        class="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        @change="resetToFirstPage"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="-1">All</option>
                    </select>
                    <span class="text-sm text-gray-600">entries</span>
                </div>

                <!-- Search and Filter -->
                <div class="flex flex-col sm:flex-row gap-4 flex-grow sm:justify-end">
                    <div class="relative flex-grow sm:max-w-xs">
                        <input v-model="searchQuery" type="text" placeholder="Search students..." class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <i data-feather="search" class="absolute left-3 top-2.5 text-gray-400"></i>
                    </div>
                    <select v-model="filterCategory" class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="">All Categories</option>
                        <option v-for="category in fundCategories" :value="category">{{ category }}</option>
                    </select>
                </div>
            </div>

            <!-- Table Info -->
            <div class="mb-4 text-sm text-gray-600">
                Showing {{ paginationStart }} to {{ paginationEnd }} of {{ filteredContributions.length }} entries
                <span v-if="filteredContributions.length !== contributions.length">
                    (filtered from {{ contributions.length }} total entries)
                </span>
            </div>

            <ContributionTable 
                :contributions="paginatedContributions"
                :fund-categories="fundCategories"
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

            <!-- Pagination Controls -->
            <div class="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
                <div class="text-sm text-gray-600">
                    Showing {{ paginationStart }} to {{ paginationEnd }} of {{ filteredContributions.length }} entries
                </div>
                
                <div class="flex gap-2">
                    <!-- Previous Button -->
                    <button 
                        @click="previousPage" 
                        :disabled="currentPage === 1"
                        class="px-3 py-2 border rounded-lg text-sm font-medium transition"
                        :class="currentPage === 1 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-gray-700 hover:bg-gray-50'"
                    >
                        Previous
                    </button>

                    <!-- Page Numbers -->
                    <div class="flex gap-1">
                        <button 
                            v-for="page in visiblePages" 
                            :key="page"
                            @click="goToPage(page)"
                            class="px-3 py-2 border rounded-lg text-sm font-medium transition min-w-[40px]"
                            :class="page === currentPage 
                                ? 'bg-indigo-600 text-white border-indigo-600' 
                                : 'text-gray-700 hover:bg-gray-50'"
                        >
                            {{ page }}
                        </button>
                        
                        <span v-if="showEllipsis" class="px-2 py-2 text-gray-500">...</span>
                    </div>

                    <!-- Next Button -->
                    <button 
                        @click="nextPage" 
                        :disabled="currentPage === totalPages"
                        class="px-3 py-2 border rounded-lg text-sm font-medium transition"
                        :class="currentPage === totalPages 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-gray-700 hover:bg-gray-50'"
                    >
                        Next
                    </button>
                </div>
            </div>
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
            sortDirection: 'desc',
            perPage: 5,
            currentPage: 1
        };
    },
    computed: {
        filteredContributions() {
            let result = [...this.contributions];
            
            // Filter by search query
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                result = result.filter(c => 
                    c.studentName.toLowerCase().includes(query)
                );
            }
            
            // Filter by category
            if (this.filterCategory) {
                result = result.filter(c => c.fundCategory === this.filterCategory);
            }
            
            // Sort
            if (this.sortColumn) {
                result.sort((a, b) => {
                    if (a[this.sortColumn] < b[this.sortColumn]) {
                        return this.sortDirection === 'asc' ? -1 : 1;
                    }
                    if (a[this.sortColumn] > b[this.sortColumn]) {
                        return this.sortDirection === 'asc' ? 1 : -1;
                    }
                    return 0;
                });
            }
            
            return result;
        },
        
        totalPages() {
            if (this.perPage === -1) return 1;
            return Math.ceil(this.filteredContributions.length / this.perPage);
        },
        
        paginatedContributions() {
            if (this.perPage === -1) {
                return this.filteredContributions;
            }
            
            const startIndex = (this.currentPage - 1) * this.perPage;
            const endIndex = startIndex + this.perPage;
            return this.filteredContributions.slice(startIndex, endIndex);
        },
        
        paginationStart() {
            if (this.filteredContributions.length === 0) return 0;
            if (this.perPage === -1) return 1;
            return (this.currentPage - 1) * this.perPage + 1;
        },
        
        paginationEnd() {
            if (this.filteredContributions.length === 0) return 0;
            if (this.perPage === -1) return this.filteredContributions.length;
            return Math.min(this.currentPage * this.perPage, this.filteredContributions.length);
        },
        
        visiblePages() {
            const pages = [];
            const maxVisiblePages = 5;
            
            let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
            
            // Adjust start page if we're near the end
            if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
            
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            
            return pages;
        },
        
        showEllipsis() {
            return this.totalPages > this.visiblePages.length && 
                   Math.max(...this.visiblePages) < this.totalPages;
        }
    },
    watch: {
        searchQuery() {
            this.resetToFirstPage();
        },
        filterCategory() {
            this.resetToFirstPage();
        },
        perPage() {
            this.resetToFirstPage();
        }
    },
    methods: {
        resetToFirstPage() {
            this.currentPage = 1;
        },
        
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        
        goToPage(page) {
            this.currentPage = page;
        }
    }
}
</script>