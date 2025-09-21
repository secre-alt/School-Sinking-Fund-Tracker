<template>
  <div  class="min-h-screen flex flex-col">
    <Header />
    
    <main class="container mx-auto px-4 py-8">
      <FundSummary 
        :total-contributions="totalContributions"
        :student-count="studentCount"
        :fund-categories="fundCategories"
        :contributions="contributions"
      />
      
      <StudentContributions 
        :contributions="contributions"
        :fund-categories="fundCategories"
        @add-contribution="showAddContributionModal = true; editingContribution = false; currentContribution = null"
        @edit-contribution="editContribution"
        @add-funds="addFunds"
        @delete-contribution="confirmDelete"
      />
      
      <StudentBalances 
        :student-balances="studentBalances"
        :contributions="contributions"
        @show-student-history="showStudentHistory"
      />
    </main>

    <Footer />

    <AddEditContributionModal 
      :show="showAddContributionModal"
      :editing-contribution="editingContribution"
      :contribution="currentContribution"
      :fund-categories="fundCategories"
      @close="closeModal"
      @save="saveContribution"
      @add-category="addCategory"
    />
    
    <DeleteConfirmationModal 
      :show="showDeleteModal"
      :contribution="currentContribution"
      @close="closeModal"
      @confirm="deleteContribution"
    />
    
    <StudentHistoryModal 
      :show="showStudentHistoryModal"
      :student="selectedStudent"
      :contributions="contributions"
      :student-balances="studentBalances"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import Header from './components/Header.vue';
import FundSummary from './components/FundSummary.vue';
import StudentContributions from './components/StudentContributions.vue';
import StudentBalances from './components/StudentBalances.vue';
import AddEditContributionModal from './components/AddEditContributionModal.vue';
import DeleteConfirmationModal from './components/DeleteConfirmationModal.vue';
import StudentHistoryModal from './components/StudentHistoryModal.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    FundSummary,
    StudentContributions,
    StudentBalances,
    AddEditContributionModal,
    DeleteConfirmationModal,
    StudentHistoryModal
  },
  setup() {
    // Data
    const contributions = ref(JSON.parse(localStorage.getItem('contributions')) || []);
    const fundCategories = ref(JSON.parse(localStorage.getItem('fundCategories')) || ['Building Maintenance', 'Equipment', 'School Events', 'Scholarships']);
    const showAddContributionModal = ref(false);
    const showDeleteModal = ref(false);
    const showStudentHistoryModal = ref(false);
    const editingContribution = ref(false);
    const currentContribution = ref(null);
    const selectedStudent = ref('');

    // Computed properties
    const totalContributions = computed(() => {
      return contributions.value.reduce((sum, contribution) => sum + contribution.amount, 0);
    });

    const studentCount = computed(() => {
      const uniqueStudents = new Set(contributions.value.map(c => c.studentName));
      return uniqueStudents.size;
    });

    const studentBalances = computed(() => {
      const balances = {};
      contributions.value.forEach(contribution => {
        if (!balances[contribution.studentName]) {
          balances[contribution.studentName] = 0;
        }
        balances[contribution.studentName] += contribution.amount;
      });
      return balances;
    });

    // Methods
    const saveContribution = (contributionData) => {
      if (editingContribution.value) {
        // Update existing contribution
        const index = contributions.value.findIndex(c => c.id === contributionData.id);
        if (index !== -1) {
          contributions.value[index] = {...contributionData};
        }
      } else {
        // Add new contribution
        contributionData.id = Date.now().toString();
        
        // Calculate running balance
        const studentContribs = contributions.value.filter(c => c.studentName === contributionData.studentName);
        const currentBalance = studentContribs.reduce((sum, c) => sum + c.amount, 0);
        contributionData.runningBalance = currentBalance + Number(contributionData.amount);
        
        contributions.value.push({...contributionData});
      }

      // Save to localStorage
      localStorage.setItem('contributions', JSON.stringify(contributions.value));
      
      closeModal();
    };

    const addFunds = (contribution) => {
      currentContribution.value = {
        ...contribution,
        id: null,
        amount: '',
        date: new Date().toISOString().split('T')[0]
      };
      editingContribution.value = false;
      showAddContributionModal.value = true;
    };

    const editContribution = (contribution) => {
      currentContribution.value = {...contribution};
      editingContribution.value = true;
      showAddContributionModal.value = true;
    };

    const confirmDelete = (contribution) => {
      currentContribution.value = contribution;
      showDeleteModal.value = true;
    };

    const deleteContribution = () => {
      contributions.value = contributions.value.filter(c => c.id !== currentContribution.value.id);
      localStorage.setItem('contributions', JSON.stringify(contributions.value));
      showDeleteModal.value = false;
    };

    const showStudentHistory = (student) => {
      selectedStudent.value = student;
      showStudentHistoryModal.value = true;
    };

    const closeModal = () => {
      showAddContributionModal.value = false;
      showDeleteModal.value = false;
      showStudentHistoryModal.value = false;
      editingContribution.value = false;
      currentContribution.value = null;
    };

    const addCategory = (category) => {
      if (!fundCategories.value.includes(category)) {
        fundCategories.value.push(category);
        localStorage.setItem('fundCategories', JSON.stringify(fundCategories.value));
      }
    };

    // Lifecycle hooks
    onMounted(() => {
      // Initialize feather icons
      if (typeof feather !== 'undefined') {
        feather.replace();
      }
    });

    // Watch for changes to contributions to update localStorage
    watch(contributions, (newValue) => {
      localStorage.setItem('contributions', JSON.stringify(newValue));
    }, { deep: true });

    return {
      contributions,
      fundCategories,
      showAddContributionModal,
      showDeleteModal,
      showStudentHistoryModal,
      editingContribution,
      currentContribution,
      selectedStudent,
      totalContributions,
      studentCount,
      studentBalances,
      saveContribution,
      addFunds,
      editContribution,
      confirmDelete,
      deleteContribution,
      showStudentHistory,
      closeModal,
      addCategory
    };
  }
}
</script>
