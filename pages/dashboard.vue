<template>
  <NuxtLayout name="default">
  <div class="space-y-6">
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-400">Model Accuracy</p>
            <p class="text-2xl font-bold text-green-400">{{ modelMetrics.accuracy }}%</p>
          </div>
          <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
            <CheckCircleIcon class="w-6 h-6 text-green-400" />
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-400">Total Transactions</p>
            <p class="text-2xl font-bold text-blue-400">{{ formatNumber(modelMetrics.totalTransactions) }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <CreditCardIcon class="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-400">Frauds Detected</p>
            <p class="text-2xl font-bold text-red-400">{{ formatNumber(modelMetrics.fraudDetected) }}</p>
          </div>
          <div class="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
            <ExclamationTriangleIcon class="w-6 h-6 text-red-400" />
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-400">Model Status</p>
            <p class="text-2xl font-bold text-green-400 capitalize">{{ modelMetrics.status }}</p>
          </div>
          <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
            <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Daily Transactions Chart -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-white mb-4">Daily Transactions</h3>
        <div class="h-64">
          <DashboardChart :data="chartData" type="line" />
        </div>
      </div>

      <!-- Fraud Distribution -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-white mb-4">Fraud Distribution</h3>
        <div class="h-64">
          <DashboardChart :data="pieChartData" type="doughnut" />
        </div>
      </div>
    </div>

    <!-- Model Performance -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-white mb-6">Model Performance Metrics</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-400">{{ modelMetrics.precision }}%</div>
          <div class="text-sm text-gray-400">Precision</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-green-400">{{ modelMetrics.recall }}%</div>
          <div class="text-sm text-gray-400">Recall</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-purple-400">{{ modelMetrics.f1Score }}%</div>
          <div class="text-sm text-gray-400">F1-Score</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-yellow-400">{{ modelMetrics.falsePositives }}</div>
          <div class="text-sm text-gray-400">False Positives</div>
        </div>
      </div>
    </div>

    <!-- Recent Transactions -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-white mb-4">Recent High-Risk Transactions</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-700">
              <th class="text-left py-3 text-gray-400">Transaction ID</th>
              <th class="text-left py-3 text-gray-400">Amount</th>
              <th class="text-left py-3 text-gray-400">Merchant</th>
              <th class="text-left py-3 text-gray-400">Risk Score</th>
              <th class="text-left py-3 text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in recentTransactions" :key="transaction.id" class="border-b border-gray-700/50">
              <td class="py-3 text-blue-400">{{ transaction.id }}</td>
              <td class="py-3">${{ transaction.amount.toFixed(2) }}</td>
              <td class="py-3">{{ transaction.merchant }}</td>
              <td class="py-3">
                <span 
                  :class="transaction.riskScore > 80 ? 'text-red-400' : transaction.riskScore > 50 ? 'text-yellow-400' : 'text-green-400'"
                >
                  {{ transaction.riskScore.toFixed(1) }}%
                </span>
              </td>
              <td class="py-3">
                <span 
                  :class="transaction.isFraud ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'"
                  class="px-2 py-1 rounded-full text-xs"
                >
                  {{ transaction.isFraud ? 'Flagged' : 'Approved' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { 
  CheckCircleIcon, 
  CreditCardIcon, 
  ExclamationTriangleIcon 
} from '@heroicons/vue/24/outline'

definePageMeta({
  middleware: 'auth'
})

const { modelMetrics, dailyStats, generateMockTransactions } = useFraudData()

const recentTransactions = computed(() => {
  return generateMockTransactions(10).filter(t => t.riskScore > 60).slice(0, 5)
})

const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(num)
}

const chartData = computed(() => ({
  labels: dailyStats.value.map(d => new Date(d.date).toLocaleDateString()),
  datasets: [
    {
      label: 'Total Transactions',
      data: dailyStats.value.map(d => d.transactions),
      borderColor: '#3B82F6',
      backgroundColor: '#3B82F6',
      tension: 0.4
    },
    {
      label: 'Fraudulent',
      data: dailyStats.value.map(d => d.frauds),
      borderColor: '#EF4444',
      backgroundColor: '#EF4444',
      tension: 0.4
    }
  ]
}))

const pieChartData = computed(() => ({
  labels: ['Legitimate', 'Fraudulent', 'Under Review'],
  datasets: [
    {
      data: [94.5, 4.2, 1.3],
      backgroundColor: ['#10B981', '#EF4444', '#F59E0B'],
      borderWidth: 0
    }
  ]
}))
</script>