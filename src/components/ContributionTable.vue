<template>
    <section class="mb-12">
        <div class="overflow-x-auto scrollbar-hide">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="sortBy('studentName')">
                        <div class="flex items-center gap-1">
                            Student
                            <i data-feather="chevron-down" class="w-4 h-4" v-if="sortColumn === 'studentName' && sortDirection === 'desc'"></i>
                            <i data-feather="chevron-up" class="w-4 h-4" v-if="sortColumn === 'studentName' && sortDirection === 'asc'"></i>
                        </div>
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="sortBy('date')">
                        <div class="flex items-center gap-1">
                            Date
                            <i data-feather="chevron-down" class="w-4 h-4" v-if="sortColumn === 'date' && sortDirection === 'desc'"></i>
                            <i data-feather="chevron-up" class="w-4 h-4" v-if="sortColumn === 'date' && sortDirection === 'asc'"></i>
                        </div>
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="sortBy('runningBalance')">
                        <div class="flex items-center gap-1">
                            Balance
                            <i data-feather="chevron-down" class="w-4 h-4" v-if="sortColumn === 'runningBalance' && sortDirection === 'desc'"></i>
                            <i data-feather="chevron-up" class="w-4 h-4" v-if="sortColumn === 'runningBalance' && sortDirection === 'asc'"></i>
                        </div>
                    </th>
                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="contribution in contributions" :key="contribution.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                <i data-feather="user" class="text-indigo-600"></i>
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">{{ contribution.studentName }}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="getCategoryColor(contribution.fundCategory)">
                            {{ contribution.fundCategory }}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ formatDate(contribution.date) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₱{{ formatCurrency(contribution.amount) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        ₱{{ formatCurrency(contribution.runningBalance) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button @click="$emit('add-funds', contribution)" class="text-green-600 hover:text-green-900 mr-2">
                        <i data-feather="plus"></i>
                        </button>
                        <button @click="$emit('edit-contribution', contribution)" class="text-indigo-600 hover:text-indigo-900 mr-2">
                            <i data-feather="edit"></i>
                        </button>
                        <button @click="$emit('delete-contribution', contribution)" class="text-red-600 hover:text-red-900">
                            <i data-feather="trash-2"></i>
                        </button>
                    </td>
                </tr>
                <tr v-if="contributions.length === 0">
                    <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                        No contributions found
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    </section>
</template>

<script>
import { formatCurrency, formatDate, getCategoryColor } from '../utils/formatters';

export default {
    name: 'ContributionTable',
    props: {
        contributions: {
            type: Array,
            default: () => []   // <--- prevents undefined
        },
        searchQuery: String,
        filterCategory: String,
        sortColumn: String,
        sortDirection: String
    },
    emits: ['edit-contribution', 'add-funds', 'delete-contribution', 'update:sortColumn', 'update:sortDirection'],
    methods: {
        formatCurrency,
        formatDate,
        getCategoryColor,
        sortBy(column) {
            if (this.sortColumn === column) {
                this.$emit('update:sortDirection', this.sortDirection === 'asc' ? 'desc' : 'asc');
            } else {
                this.$emit('update:sortColumn', column);
                this.$emit('update:sortDirection', 'asc');
            }
        }
    } 
}
</script>