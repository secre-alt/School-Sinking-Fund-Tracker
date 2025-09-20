<template>
    <section class="mb-12">
        <div class="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 class="text-xl font-semibold mb-4 text-gray-800">Fund Summary</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div class="bg-indigo-50 p-4 rounded-lg">
                    <p class="text-sm text-indigo-600 font-medium">Total Contributions</p>
                    <p class="text-2xl font-bold text-indigo-800">₱{{ formatCurrency(totalContributions) }}</p>
                </div>
                <div class="bg-green-50 p-4 rounded-lg">
                    <p class="text-sm text-green-600 font-medium">Total Students</p>
                    <p class="text-2xl font-bold text-green-800">{{ studentCount }}</p>
                </div>
                <div class="bg-purple-50 p-4 rounded-lg">
                    <p class="text-sm text-purple-600 font-medium">Fund Categories</p>
                    <p class="text-2xl font-bold text-purple-800">{{ fundCategories.length }}</p>
                </div>
            </div>

            <div class="mb-6">
                <canvas id="fundChart" class="w-full h-64"></canvas>
            </div>
        </div>
    </section>
</template>

<script>
import { formatCurrency } from '../utils/formatters';

export default {
    name: 'FundSummary',
    props: {
        totalContributions: Number,
        studentCount: Number,
        fundCategories: Array,
        contributions: Array
    },
    methods: {
        formatCurrency,
        updateChart() {
            // Chart implementation would go here
            console.log("Chart would update with data");
        }
    },
    mounted() {
        this.updateChart();
    },
    watch: {
        contributions: {
            handler() {
                this.updateChart();
            },
            deep: true
        }
    }
}
</script>