<template>
  <NuxtLayout name="default">
  <div class="space-y-6">
    <!-- Analysis Controls -->
    <div class="card p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 class="text-xl font-semibold text-white">Data Analysis & Visualization</h2>
        <div class="flex space-x-4" v-if="analysisData">
          <select v-model="timeRange" @change="fetchAnalysisData" class="input-field">
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button @click="refreshData" :disabled="loading" class="btn-primary flex items-center space-x-2">
            <ArrowPathIcon v-if="loading" class="w-4 h-4 animate-spin" />
            <span>{{ loading ? 'Refreshing...' : 'Refresh Data' }}</span>
          </button>
          <button @click="exportAnalysis" class="btn-primary">Export Analysis</button>
        </div>
      </div>
    </div>

    <!-- File Upload Section -->
    <div v-if="!analysisData" class="card p-8">
      <div class="text-center">
        <div class="mb-6">
          <DocumentArrowUpIcon class="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-white mb-2">Upload Data File</h3>
          <p class="text-gray-400">Upload a CSV file to begin your fraud detection analysis</p>
        </div>

        <!-- File Drop Zone -->
        <div 
          @drop="handleFileDrop"
          @dragover.prevent
          @dragenter.prevent
          class="border-2 border-dashed border-gray-600 rounded-lg p-8 mb-4 transition-colors"
          :class="{
            'border-blue-500 bg-blue-500/5': isDragging,
            'hover:border-gray-500 hover:bg-gray-700/20': !isDragging
          }"
          @dragenter="isDragging = true"
          @dragleave="isDragging = false"
        >
          <div class="space-y-4">
            <CloudArrowUpIcon class="w-12 h-12 text-gray-400 mx-auto" />
            <div>
              <p class="text-white font-medium">Drop your CSV file here</p>
              <p class="text-gray-400 text-sm">or click to browse</p>
            </div>
            <input
              ref="fileInput"
              type="file"
              accept=".csv,.xlsx,.xls"
              @change="handleFileSelect"
              class="hidden"
            />
            <button @click="$refs.fileInput.click()" class="btn-primary">
              Choose File
            </button>
          </div>
        </div>



      </div>
    </div>

    <!-- File Processing Status -->
    <div v-if="uploadStatus.processing" class="card p-6">
      <div class="flex items-center space-x-4">
        <ArrowPathIcon class="w-6 h-6 animate-spin text-blue-400" />
        <div class="flex-1">
          <h3 class="text-white font-medium">Processing File</h3>
          <p class="text-gray-400 text-sm">{{ uploadStatus.message }}</p>
          <div class="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
              class="bg-blue-500 h-2 rounded-full transition-all duration-300"
              :style="{ width: uploadStatus.progress + '%' }"
            ></div>
          </div>
        </div>
        <span class="text-blue-400 text-sm">{{ uploadStatus.progress }}%</span>
      </div>
    </div>

    <!-- Upload Success/Error -->
    <div v-if="uploadStatus.completed && !uploadStatus.error" class="card p-6 border-green-500/20 bg-green-500/5">
      <div class="flex items-center space-x-3">
        <CheckCircleIcon class="w-6 h-6 text-green-400" />
        <div>
          <h3 class="text-green-400 font-semibold">File Uploaded Successfully</h3>
          <p class="text-gray-300 text-sm">{{ uploadStatus.fileName }} - {{ formatNumber(uploadStatus.recordCount) }} records processed</p>
        </div>
        <button @click="resetUpload" class="btn-secondary text-sm ml-auto">
          Upload New File
        </button>
      </div>
    </div>

    <div v-if="uploadStatus.error" class="card p-6 border-red-500/20 bg-red-500/5">
      <div class="flex items-center space-x-3">
        <ExclamationTriangleIcon class="w-6 h-6 text-red-400" />
        <div>
          <h3 class="text-red-400 font-semibold">Upload Error</h3>
          <p class="text-gray-300 text-sm">{{ uploadStatus.error }}</p>
          <button @click="resetUpload" class="btn-primary mt-2 text-sm">Try Again</button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && analysisData" class="flex items-center justify-center py-12">
      <div class="text-center">
        <ArrowPathIcon class="w-8 h-8 animate-spin mx-auto mb-4 text-blue-400" />
        <p class="text-gray-400">Loading analysis data...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="card p-6 border-red-500/20 bg-red-500/5">
      <div class="flex items-center space-x-3">
        <ExclamationTriangleIcon class="w-6 h-6 text-red-400" />
        <div>
          <h3 class="text-red-400 font-semibold">Error Loading Data</h3>
          <p class="text-gray-300 text-sm">{{ error }}</p>
          <button @click="fetchAnalysisData" class="btn-primary mt-2 text-sm">Retry</button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="analysisData">
      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-400">Fraud Rate</p>
              <p class="text-2xl font-bold text-red-400">{{ formatPercentage(analysisData.fraud_statistics.fraud_percentage) }}%</p>
              <p class="text-xs text-green-400">{{ analysisData.fraud_statistics.fraud_cases }} cases detected</p>
            </div>
            <div class="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
              <ExclamationTriangleIcon class="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-400">Total Transactions</p>
              <p class="text-2xl font-bold text-blue-400">{{ formatNumber(analysisData.fraud_statistics.total_transactions) }}</p>
              <p class="text-xs text-gray-400">{{ formatNumber(analysisData.fraud_statistics.legitimate_transactions) }} legitimate</p>
            </div>
            <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <ChartBarIcon class="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-400">High Risk Amount Range</p>
              <p class="text-2xl font-bold text-yellow-400">$501-1000</p>
              <p class="text-xs text-red-400">{{ formatPercentage(getAmountRangeFraudRate('501-1000')) }}% fraud rate</p>
            </div>
            <div class="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <CurrencyDollarIcon class="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-400">Detection Accuracy</p>
              <p class="text-2xl font-bold text-green-400">{{ calculateAccuracy() }}%</p>
              <p class="text-xs text-green-400">System performance</p>
            </div>
            <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <ShieldCheckIcon class="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Category Analysis -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-white mb-4">Fraud by Category</h3>
          <div class="h-80">
            <DashboardChart :data="categoryChartData" type="bar" />
          </div>
        </div>

        <!-- Amount Distribution -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-white mb-4">Fraud Rate by Amount Range</h3>
          <div class="h-80">
            <DashboardChart :data="amountChartData" type="line" />
          </div>
        </div>

        <!-- Gender Distribution -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-white mb-4">Fraud Distribution by Gender</h3>
          <div class="h-80">
            <DashboardChart :data="genderChartData" type="doughnut" />
          </div>
        </div>

        <!-- High Risk Categories -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-white mb-4">Highest Risk Categories</h3>
          <div class="space-y-4">
            <div v-for="category in topRiskCategories" :key="category.name" class="flex items-center">
              <div class="w-32 text-sm text-gray-300">{{ formatCategoryName(category.name) }}</div>
              <div class="flex-1 mx-4">
                <div class="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    class="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                    :style="{ width: (category.fraud_rate / topRiskCategories[0].fraud_rate) * 100 + '%' }"
                  ></div>
                </div>
              </div>
              <div class="w-16 text-sm text-red-400 text-right">{{ formatPercentage(category.fraud_rate * 100) }}%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Insights and Analysis -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- AI Insights -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-white mb-4">AI Insights</h3>
          <div class="space-y-3">
            <div 
              v-for="(insight, index) in analysisData.insights" 
              :key="index"
              class="flex items-start space-x-3 p-3 bg-gray-700/30 rounded-lg"
            >
              <div class="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-blue-400 text-xs font-bold">{{ index + 1 }}</span>
              </div>
              <p class="text-gray-300 text-sm">{{ insight }}</p>
            </div>
          </div>
        </div>

        <!-- Amount Analysis Deep Dive -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-white mb-4">Amount Range Analysis</h3>
          <div class="space-y-4">
            <div 
              v-for="(data, range) in analysisData.trends.by_amount" 
              :key="range"
              class="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
            >
              <div>
                <div class="font-medium text-white">${{ range }}</div>
                <div class="text-sm text-gray-400">{{ formatNumber(data.count) }} transactions</div>
              </div>
              <div class="text-right">
                <div class="font-medium" :class="getFraudRateColor(data.mean * 100)">
                  {{ formatPercentage(data.mean * 100) }}%
                </div>
                <div class="text-sm text-gray-400">{{ data.sum }} fraud cases</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Gender Comparison -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-white mb-4">Gender-Based Analysis</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            v-for="(data, gender) in analysisData.trends.by_gender" 
            :key="gender"
            class="p-4 bg-gray-700/30 rounded-lg text-center"
          >
            <div class="text-2xl font-bold mb-2" :class="gender === 'F' ? 'text-pink-400' : 'text-blue-400'">
              {{ gender === 'F' ? 'Female' : 'Male' }}
            </div>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div class="text-gray-400">Transactions</div>
                <div class="font-semibold text-white">{{ formatNumber(data.count) }}</div>
              </div>
              <div>
                <div class="text-gray-400">Fraud Cases</div>
                <div class="font-semibold text-red-400">{{ data.sum }}</div>
              </div>
              <div class="col-span-2">
                <div class="text-gray-400">Fraud Rate</div>
                <div class="font-semibold" :class="getFraudRateColor(data.mean * 100)">
                  {{ formatPercentage(data.mean * 100) }}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </NuxtLayout>
</template>

<script setup>
import { 
  ExclamationTriangleIcon, 
  CurrencyDollarIcon, 
  ShieldCheckIcon,
  ChartBarIcon,
  ArrowPathIcon,
  DocumentArrowUpIcon,
  CloudArrowUpIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  middleware: 'auth'
})

// Reactive data
const timeRange = ref('30d')
const analysisData = ref(null)
const loading = ref(false)
const error = ref(null)
const isDragging = ref(false)
const uploadedFile = ref(null)

// Upload status tracking
const uploadStatus = ref({
  processing: false,
  completed: false,
  error: null,
  progress: 0,
  message: '',
  fileName: '',
  recordCount: 0
})

// API configuration
const config = useRuntimeConfig()
const API_BASE_URL = config.public.apiBase || 'http://localhost:8000'

// Helper functions - Fixed versions
const formatNumber = (num) => {
  if (num == null || num === '' || isNaN(num)) return '0'
  return new Intl.NumberFormat().format(Number(num))
}

const formatPercentage = (num) => {
  if (num == null || num === '' || isNaN(num)) return '0.00'
  return Number(num).toFixed(2)
}

const formatCategoryName = (name) => {
  if (!name) return ''
  return name.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

const getAmountRangeFraudRate = (range) => {
  if (!analysisData.value?.trends?.by_amount) return '0.00'
  const data = analysisData.value.trends.by_amount[range]
  if (!data || data.mean == null || isNaN(data.mean)) return '0.00'
  return (Number(data.mean) * 100).toFixed(2)
}

const calculateAccuracy = () => {
  if (!analysisData.value?.fraud_statistics) return '0.0'
  const stats = analysisData.value.fraud_statistics
  if (!stats.legitimate_transactions || !stats.total_transactions) return '0.0'
  return ((Number(stats.legitimate_transactions) / Number(stats.total_transactions)) * 100).toFixed(1)
}

const getFraudRateColor = (rate) => {
  const numRate = Number(rate)
  if (isNaN(numRate)) return 'text-gray-400'
  if (numRate > 10) return 'text-red-400'
  if (numRate > 5) return 'text-orange-400'
  if (numRate > 1) return 'text-yellow-400'
  return 'text-green-400'
}

// File upload handlers
const handleFileDrop = (event) => {
  event.preventDefault()
  isDragging.value = false
  
  const files = event.dataTransfer.files
  if (files.length > 0) {
    processFile(files[0])
  }
}

const handleFileSelect = (event) => {
  const files = event.target.files
  if (files.length > 0) {
    processFile(files[0])
  }
}

const processFile = async (file) => {
  // Validate file
  const validTypes = ['.csv', '.xlsx', '.xls']
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
  
  if (!validTypes.includes(fileExtension)) {
    uploadStatus.value.error = 'Invalid file format. Please upload a CSV or Excel file.'
    return
  }
  
  uploadedFile.value = file
  await uploadFile(file)
}

const uploadFile = async (file) => {
  let progressInterval
  
  try {
    uploadStatus.value = {
      processing: true,
      completed: false,
      error: null,
      progress: 0,
      message: 'Preparing file upload...',
      fileName: file.name,
      recordCount: 0
    }
    
    const formData = new FormData()
    formData.append('file', file)
  
    // Simulate upload progress
    progressInterval = setInterval(() => {
      if (uploadStatus.value.progress < 90) {
        uploadStatus.value.progress += Math.random() * 15
        if (uploadStatus.value.progress < 25) {
          uploadStatus.value.message = 'Uploading file...'
        } else if (uploadStatus.value.progress < 50) {
          uploadStatus.value.message = 'Processing data...'
        } else if (uploadStatus.value.progress < 75) {
          uploadStatus.value.message = 'Analyzing patterns...'
        } else {
          uploadStatus.value.message = 'Generating insights...'
        }
      }
    }, 400)
    
    const response = await $fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      body: formData
    })
    
    clearInterval(progressInterval)
    
    // Add debugging logs
    console.log('API Response:', response)
    console.log('Response structure:', Object.keys(response || {}))
    
    // Handle different response structures
    const responseData = response.data || response
    console.log('Analysis data structure:', responseData)
    console.log('Fraud statistics:', responseData?.fraud_statistics)
    
    uploadStatus.value.progress = 100
    uploadStatus.value.message = 'Analysis complete!'
    uploadStatus.value.processing = false
    uploadStatus.value.completed = true
    uploadStatus.value.recordCount = response.record_count || responseData?.fraud_statistics?.total_transactions || 0
    
    // Set analysis data
    analysisData.value = responseData
    
    // Additional debugging
    if (analysisData.value) {
      console.log('Final analysis data:', analysisData.value)
      console.log('Fraud percentage type:', typeof analysisData.value.fraud_statistics?.fraud_percentage)
      console.log('Fraud percentage value:', analysisData.value.fraud_statistics?.fraud_percentage)
    }
    
  } catch (err) {
    if (progressInterval) clearInterval(progressInterval)
    console.error('Error uploading and analyzing file:', err)
    uploadStatus.value.processing = false
    uploadStatus.value.error = err.data?.detail || err.message || 'Failed to upload and analyze file. Please try again.'
  }
}

const resetUpload = () => {
  uploadStatus.value = {
    processing: false,
    completed: false,
    error: null,
    progress: 0,
    message: '',
    fileName: '',
    recordCount: 0
  }
  analysisData.value = null
  uploadedFile.value = null
  error.value = null
}

// Fetch updated analysis data from the same endpoint
const fetchAnalysisData = async () => {
  if (!analysisData.value) {
    error.value = 'No data available. Please upload a file first.'
    return
  }
  
  try {
    loading.value = true
    error.value = null
    
    const formData = new FormData()
    if (uploadedFile.value) {
      formData.append('file', uploadedFile.value)
      formData.append('time_range', timeRange.value)
      
      const response = await $fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        body: formData
      })
      
      analysisData.value = response.data || response
    }
  } catch (err) {
    console.error('Error fetching analysis data:', err)
    error.value = 'Failed to refresh analysis data. Please try again.'
  } finally {
    loading.value = false
  }
}

// Refresh data
const refreshData = () => {
  fetchAnalysisData()
}

// Export analysis using the same endpoint with export parameter
const exportAnalysis = async () => {
  if (!uploadedFile.value) {
    error.value = 'No data available to export.'
    return
  }
  
  try {
    const formData = new FormData()
    formData.append('file', uploadedFile.value)
    formData.append('time_range', timeRange.value)
    formData.append('export_format', 'csv')
    
    const response = await $fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      body: formData
    })
    
    // Create download link for the exported data
    const exportData = response.export_data || response
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `fraud_analysis_${timeRange.value}_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (err) {
    console.error('Error exporting analysis:', err)
  }
}

// Computed properties for charts - Fixed versions
const categoryChartData = computed(() => {
  if (!analysisData.value?.trends?.by_category) return null
  
  const categories = analysisData.value.trends.by_category
  const sortedCategories = Object.entries(categories)
    .filter(([, data]) => data && data.mean != null)
    .sort(([,a], [,b]) => Number(b.mean) - Number(a.mean))
    .slice(0, 10)
  
  return {
    labels: sortedCategories.map(([name]) => formatCategoryName(name)),
    datasets: [
      {
        label: 'Fraud Rate (%)',
        data: sortedCategories.map(([, data]) => (Number(data.mean) * 100).toFixed(3)),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: '#EF4444',
        borderWidth: 1
      }
    ]
  }
})

const amountChartData = computed(() => {
  if (!analysisData.value?.trends?.by_amount) return null
  
  const amounts = analysisData.value.trends.by_amount
  const ranges = ['0-50', '51-100', '101-500', '501-1000', '1000+']
  
  return {
    labels: ranges.map(range => `$${range}`),
    datasets: [
      {
        label: 'Fraud Rate (%)',
        data: ranges.map(range => {
          const data = amounts[range]
          return data && data.mean != null ? (Number(data.mean) * 100).toFixed(3) : '0'
        }),
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  }
})

const genderChartData = computed(() => {
  if (!analysisData.value?.trends?.by_gender) return null
  
  const genderData = analysisData.value.trends.by_gender
  
  return {
    labels: ['Female', 'Male'],
    datasets: [
      {
        data: [
          genderData.F?.sum || 0, 
          genderData.M?.sum || 0
        ],
        backgroundColor: ['#EC4899', '#3B82F6'],
        borderWidth: 0
      }
    ]
  }
})

const topRiskCategories = computed(() => {
  if (!analysisData.value?.trends?.by_category) return []
  
  return Object.entries(analysisData.value.trends.by_category)
    .filter(([, data]) => data && data.mean != null)
    .map(([name, data]) => ({
      name,
      fraud_rate: Number(data.mean),
      fraud_cases: data.sum || 0,
      total_transactions: data.count || 0
    }))
    .sort((a, b) => b.fraud_rate - a.fraud_rate)
    .slice(0, 8)
})

// Watch for time range changes
watch(timeRange, () => {
  if (analysisData.value) {
    fetchAnalysisData()
  }
})
</script>

<style scoped>
.input-field {
  @apply bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-secondary {
  @apply bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors;
}

.card {
  @apply bg-gray-800 border border-gray-700 rounded-lg;
}
</style>