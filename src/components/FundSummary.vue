<template>
  <section class="mb-12">
    <div class="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Fund Summary</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="bg-indigo-100 p-4 rounded-lg">
          <p class="text-sm text-indigo-600 font-medium">Total Contributions</p>
          <p class="text-2xl font-bold text-indigo-800">₱ {{ formatCurrency(totalContributions) }}</p>
        </div>
        <div class="bg-green-100 p-4 rounded-lg">
          <p class="text-sm text-green-600 font-medium">Total Students</p>
          <p class="text-2xl font-bold text-green-800">{{ studentCount }}</p>
        </div>
        <div class="bg-purple-100 p-4 rounded-lg">
          <p class="text-sm text-purple-600 font-medium">Fund Categories</p>
          <p class="text-2xl font-bold text-purple-800">{{ fundCategories.length }}</p>
        </div>
      </div>

      <div class="w-65 h-64 mx-auto mb-6">
        <canvas id="fundChart" ref="chartCanvas" class="w-full h-64"></canvas>
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
  data() {
    return {
      fundChart: null
    };
  },
  methods: {
    formatCurrency,
    updateChart() {
      // Destroy existing chart if it exists
      if (this.fundChart) {
        this.fundChart.destroy();
      }

      // Get the canvas context
      const ctx = this.$refs.chartCanvas.getContext('2d');
      
      // Group contributions by category
      const categoryTotals = {};
      this.contributions.forEach(contribution => {
        if (!categoryTotals[contribution.fundCategory]) {
          categoryTotals[contribution.fundCategory] = 0;
        }
        categoryTotals[contribution.fundCategory] += contribution.amount;
      });

      const categories = Object.keys(categoryTotals);
      const amounts = Object.values(categoryTotals);

      // Create the chart
      this.fundChart = new window.Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: categories,
          datasets: [{
            data: amounts,
            backgroundColor: [
              'rgba(99, 102, 241, 0.7)',
              'rgba(16, 185, 129, 0.7)',
              'rgba(168, 85, 247, 0.7)',
              'rgba(234, 179, 8, 0.7)',
              'rgba(239, 68, 68, 0.7)',
              'rgba(6, 182, 212, 0.7)'
            ],
            borderColor: [
              'rgba(99, 102, 241, 1)',
              'rgba(16, 185, 129, 1)',
              'rgba(168, 85, 247, 1)',
              'rgba(234, 179, 8, 1)',
              'rgba(239, 68, 68, 1)',
              'rgba(6, 182, 212, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((value / total) * 100);
                  return `${label}: ₱${value.toLocaleString()} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }
  },
  mounted() {
    // Wait for next tick to ensure DOM is fully rendered
    this.$nextTick(() => {
      this.updateChart();
    });
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