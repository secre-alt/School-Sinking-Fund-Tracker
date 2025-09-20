<template>
    <section>
        <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-semibold mb-6 text-gray-800">Student Balances</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="(balance, student) in studentBalances" :key="student" class="border rounded-lg p-4 hover:shadow-md transition">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="font-medium text-gray-900">{{ student }}</h3>
                            <p class="text-sm text-gray-500">{{ getStudentCategory(student) }}</p>
                        </div>
                        <span class="text-lg font-bold text-indigo-600">₱{{ formatCurrency(balance) }}</span>
                    </div>
                    <div class="mt-4 pt-4 border-t">
                        <button @click="$emit('show-student-history', student)" class="text-indigo-600 text-sm font-medium hover:text-indigo-800 flex items-center gap-1">
                            <i data-feather="list" class="w-4 h-4"></i>
                            View History
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { formatCurrency } from '../utils/formatters';

export default {
    name: 'StudentBalances',
    props: {
        studentBalances: Object,
        contributions: Array
    },
    emits: ['show-student-history'],
    methods: {
        formatCurrency,
        getStudentCategory(studentName) {
            const contribution = this.contributions.find(c => c.studentName === studentName);
            return contribution ? contribution.fundCategory : '';
        }
    }
}
</script>