<template>
    <transition name="fade">
        <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">Contribution History for {{ student }}</h3>
                         <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500 self-end sm:self">
                            <i data-feather="x"></i>
                        </button>
                    </div>

                    <div class="bg-gray-50 p-4 rounded-lg mb-4">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="text-sm text-gray-500">Total Contributions</p>
                                <p class="text-xl font-bold text-indigo-800">₱{{ formatCurrency(studentBalances[student]) }}</p>
                            </div>
                            <div class="flex gap-2">
                                <button @click="printStudentHistory" class="text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                                    <i data-feather="printer" class="w-4 h-4"></i>
                                    Print
                                </button>
                            </div>
                        </div>
                    </div>

                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="contribution in studentContributions" :key="contribution.id">
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {{ formatDate(contribution.date) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="getCategoryColor(contribution.fundCategory)">
                                        {{ contribution.fundCategory }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ₱{{ formatCurrency(contribution.amount) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    ₱{{ formatCurrency(contribution.runningBalance) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { formatCurrency, formatDate, getCategoryColor } from '../utils/formatters';

export default {
    name: 'StudentHistoryModal',
    props: {
        show: Boolean,
        student: String,
        contributions: Array,
        studentBalances: Object
    },
    emits: ['close'],
    methods: {
        formatCurrency,
        formatDate,
        getCategoryColor,
        printStudentHistory() {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Contribution History - ${this.student}</title>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 20px; }
                            h1 { color: #4f46e5; }
                            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                            th { background-color: #f3f4f6; }
                            .total { font-weight: bold; margin-top: 20px; }
                        </style>
                    </head>
                    <body>
                        <h1>Contribution History for ${this.student}</h1>
                        <p>Generated on: ${new Date().toLocaleDateString()}</p>
                        <table>
                            <tr>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Balance</th>
                            </tr>
                            ${this.studentContributions.map(c => `
                                <tr>
                                    <td>${this.formatDate(c.date)}</td>
                                    <td>${c.fundCategory}</td>
                                    <td>₱${this.formatCurrency(c.amount)}</td>
                                    <td>₱${this.formatCurrency(c.runningBalance)}</td>
                                </tr>
                            `).join('')}
                        </table>
                        <p class="total">Total Contributions:  ₱${this.formatCurrency(this.studentBalances[this.student])}</p>
                        <script>
                            window.onload = function() {
                                window.print();
                                setTimeout(function() {
                                    window.close();
                                }, 1000);
                            };
                        <\/script>
                    </body>
                </html>
            `);
            printWindow.document.close();
        }
    },
    computed: {
        studentContributions() {
            return this.contributions
                .filter(c => c.studentName === this.student)
                .sort((a, b) => new Date(b.date) - new Date(a.date));
        }
    }
}
</script>