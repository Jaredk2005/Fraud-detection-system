<template>
  <NuxtLayout name="default">
  <div class="space-y-6">
    <!-- Report Generation -->
    <div class="card p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 class="text-xl font-semibold text-white">Report Generation</h2>
        <button @click="generateReport" class="btn-primary">
          Generate New Report
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Report Configuration -->
        <div>
          <h3 class="text-lg font-medium text-white mb-4">Report Configuration</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Report Type</label>
              <select v-model="reportConfig.type" class="input-field w-full">
                <option value="fraud_summary">Fraud Detection Summary</option>
                <option value="compliance">Regulatory Compliance</option>
                <option value="performance">Model Performance</option>
                <option value="audit">Internal Audit</option>
                <option value="custom">Custom Analysis</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Time Period</label>
              <select v-model="reportConfig.period" class="input-field w-full">
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            <div v-if="reportConfig.period === 'custom'" class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                <input v-model="reportConfig.startDate" type="date" class="input-field w-full" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">End Date</label>
                <input v-model="reportConfig.endDate" type="date" class="input-field w-full" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Format</label>
              <div class="flex space-x-4">
                <label class="flex items-center">
                  <input 
                    v-model="reportConfig.format" 
                    type="radio" 
                    value="pdf" 
                    class="mr-2"
                  />
                  <span class="text-gray-300">PDF</span>
                </label>
                <label class="flex items-center">
                  <input 
                    v-model="reportConfig.format" 
                    type="radio" 
                    value="xlsx" 
                    class="mr-2"
                  />
                  <span class="text-gray-300">Excel</span>
                </label>
                <label class="flex items-center">
                  <input 
                    v-model="reportConfig.format" 
                    type="radio" 
                    value="csv" 
                    class="mr-2"
                  />
                  <span class="text-gray-300">CSV</span>
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Include Sections</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input 
                    v-model="reportConfig.sections" 
                    type="checkbox" 
                    value="executive_summary" 
                    class="mr-2"
                  />
                  <span class="text-gray-300">Executive Summary</span>
                </label>
                <label class="flex items-center">
                  <input 
                    v-model="reportConfig.sections" 
                    type="checkbox" 
                    value="detailed_analysis" 
                    class="mr-2"
                  />
                  <span class="text-gray-300">Detailed Analysis</span>
                </label>
                <label class="flex items-center">
                  <input 
                    v-model="reportConfig.sections" 
                    type="checkbox" 
                    value="charts" 
                    class="mr-2"
                  />
                  <span class="text-gray-300">Charts & Visualizations</span>
                </label>
                <label class="flex items-center">
                  <input 
                    v-model="reportConfig.sections" 
                    type="checkbox" 
                    value="recommendations" 
                    class="mr-2"
                  />
                  <span class="text-gray-300">Recommendations</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Report Preview -->
        <div>
          <h3 class="text-lg font-medium text-white mb-4">Report Preview</h3>
          <div class="border border-gray-600 rounded-lg p-4 bg-gray-700/30 min-h-96">
            <div v-if="reportConfig.type" class="space-y-4">
              <div class="text-center">
                <h4 class="text-lg font-semibold text-white">{{ getReportTitle() }}</h4>
                <p class="text-sm text-gray-400">{{ getReportPeriodText() }}</p>
              </div>
              
              <div class="border-t border-gray-600 pt-4">
                <div v-for="section in reportConfig.sections" :key="section" class="mb-3">
                  <div class="text-sm font-medium text-blue-400">{{ formatSectionName(section) }}</div>
                </div>
              </div>
              
              <div class="text-xs text-gray-500 mt-4">
                Format: {{ reportConfig.format.toUpperCase() }} | 
                Generated: {{ new Date().toLocaleDateString() }}
              </div>
            </div>
            <div v-else class="text-center text-gray-400 py-8">
              Select report type to see preview
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Reports -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-white mb-6">Recent Reports</h3>
      
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-700">
              <th class="text-left py-3 text-gray-400">Report Name</th>
              <th class="text-left py-3 text-gray-400">Type</th>
              <th class="text-left py-3 text-gray-400">Period</th>
              <th class="text-left py-3 text-gray-400">Generated</th>
              <th class="text-left py-3 text-gray-400">Status</th>
              <th class="text-left py-3 text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="report in recentReports" 
              :key="report.id"
              class="border-b border-gray-700/50"
            >
              <td class="py-3">
                <div class="font-medium text-white">{{ report.name }}</div>
                <div class="text-sm text-gray-400">{{ formatFileSize(report.size) }}</div>
              </td>
              <td class="py-3 text-gray-300">{{ report.type }}</td>
              <td class="py-3 text-gray-300">{{ report.period }}</td>
              <td class="py-3 text-gray-300">{{ formatDate(report.createdAt) }}</td>
              <td class="py-3">
                <span 
                  :class="report.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'"
                  class="px-2 py-1 rounded-full text-xs"
                >
                  {{ report.status }}
                </span>
              </td>
              <td class="py-3">
                <div class="flex space-x-2">
                  <button class="text-blue-400 hover:text-blue-300 text-sm">Download</button>
                  <button class="text-gray-400 hover:text-gray-300 text-sm">View</button>
                  <button class="text-red-400 hover:text-red-300 text-sm">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Scheduled Reports -->
    <div class="card p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-white">Scheduled Reports</h3>
        <button class="btn-secondary">Add Schedule</button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="schedule in scheduledReports" 
          :key="schedule.id"
          class="p-4 bg-gray-700/30 rounded-lg border border-gray-600"
        >
          <div class="flex items-center justify-between mb-3">
            <h4 class="font-medium text-white">{{ schedule.name }}</h4>
            <div class="flex items-center space-x-1">
              <div 
                :class="schedule.active ? 'bg-green-400' : 'bg-gray-400'"
                class="w-2 h-2 rounded-full"
              ></div>
              <span 
                :class="schedule.active ? 'text-green-400' : 'text-gray-400'"
                class="text-xs"
              >
                {{ schedule.active ? 'Active' : 'Inactive' }}
              </span>
            </div>
          </div>
          
          <div class="space-y-2 text-sm text-gray-300">
            <div>Type: {{ schedule.type }}</div>
            <div>Frequency: {{ schedule.frequency }}</div>
            <div>Next Run: {{ formatDate(schedule.nextRun) }}</div>
            <div>Recipients: {{ schedule.recipients.length }} people</div>
          </div>
          
          <div class="flex space-x-2 mt-4">
            <button class="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
            <button 
              :class="schedule.active ? 'text-yellow-400 hover:text-yellow-300' : 'text-green-400 hover:text-green-300'"
              class="text-sm"
            >
              {{ schedule.active ? 'Pause' : 'Activate' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { format } from 'date-fns'

definePageMeta({
  middleware: 'auth'
})

const reportConfig = reactive({
  type: 'fraud_summary',
  period: '30d',
  startDate: '',
  endDate: '',
  format: 'pdf',
  sections: ['executive_summary', 'detailed_analysis', 'charts']
})

const recentReports = ref([
  {
    id: 1,
    name: 'Fraud Detection Summary - January 2024',
    type: 'Fraud Summary',
    period: 'Last 30 days',
    createdAt: new Date('2024-01-20'),
    status: 'completed',
    size: 2548576
  },
  {
    id: 2,
    name: 'Compliance Report Q4 2023',
    type: 'Compliance',
    period: 'Q4 2023',
    createdAt: new Date('2024-01-15'),
    status: 'completed',
    size: 4823040
  },
  {
    id: 3,
    name: 'Model Performance Analysis',
    type: 'Performance',
    period: 'Last 90 days',
    createdAt: new Date('2024-01-10'),
    status: 'processing',
    size: 0
  }
])

const scheduledReports = ref([
  {
    id: 1,
    name: 'Weekly Fraud Summary',
    type: 'Fraud Summary',
    frequency: 'Weekly (Monday)',
    nextRun: new Date('2024-01-22'),
    active: true,
    recipients: ['admin@company.com', 'security@company.com']
  },
  {
    id: 2,
    name: 'Monthly Compliance Report',
    type: 'Compliance',
    frequency: 'Monthly (1st)',
    nextRun: new Date('2024-02-01'),
    active: true,
    recipients: ['compliance@company.com']
  },
  {
    id: 3,
    name: 'Quarterly Audit Report',
    type: 'Audit',
    frequency: 'Quarterly',
    nextRun: new Date('2024-04-01'),
    active: false,
    recipients: ['audit@company.com', 'ceo@company.com']
  }
])

const generateReport = async () => {
  // Simulate report generation
  console.log('Generating report with config:', reportConfig)
  
  // Add to recent reports
  const newReport = {
    id: Date.now(),
    name: `${getReportTitle()} - ${new Date().toLocaleDateString()}`,
    type: getReportTypeDisplay(),
    period: getReportPeriodText(),
    createdAt: new Date(),
    status: 'processing',
    size: 0
  }
  
  recentReports.value.unshift(newReport)
  
  // Simulate completion after 3 seconds
  setTimeout(() => {
    newReport.status = 'completed'
    newReport.size = Math.floor(Math.random() * 5000000) + 1000000
  }, 3000)
}

const getReportTitle = () => {
  const titles = {
    fraud_summary: 'Fraud Detection Summary Report',
    compliance: 'Regulatory Compliance Report',
    performance: 'Model Performance Analysis',
    audit: 'Internal Audit Report',
    custom: 'Custom Analysis Report'
  }
  return titles[reportConfig.type] || 'Report'
}

const getReportTypeDisplay = () => {
  const displays = {
    fraud_summary: 'Fraud Summary',
    compliance: 'Compliance',
    performance: 'Performance',
    audit: 'Audit',
    custom: 'Custom'
  }
  return displays[reportConfig.type] || 'Report'
}

const getReportPeriodText = () => {
  const periods = {
    '7d': 'Last 7 days',
    '30d': 'Last 30 days',
    '90d': 'Last 90 days',
    '1y': 'Last year',
    'custom': `${reportConfig.startDate} to ${reportConfig.endDate}`
  }
  return periods[reportConfig.period] || 'Custom period'
}

const formatSectionName = (section: string) => {
  return section.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

const formatDate = (date: Date) => {
  return format(date, 'MMM dd, yyyy HH:mm')
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>