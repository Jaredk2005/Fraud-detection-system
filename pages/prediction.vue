<template>
  <NuxtLayout name="default">
  <div class="space-y-6">
    <!-- Prediction Modes -->
    <div class="flex space-x-4 mb-6">
      <button 
        @click="activeTab = 'single'"
        :class="activeTab === 'single' ? 'btn-primary' : 'btn-secondary'"
      >
        Single Prediction
      </button>
      <button 
        @click="activeTab = 'batch'"
        :class="activeTab === 'batch' ? 'btn-primary' : 'btn-secondary'"
      >
        Batch Prediction
      </button>
    </div>

    <!-- Single Prediction -->
    <div v-if="activeTab === 'single'" class="card p-6">
      <h2 class="text-xl font-semibold text-white mb-6">Single Transaction Prediction</h2>
      
      <form @submit.prevent="predictSingle" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Transaction Amount</label>
          <input 
            v-model="singleForm.amt" 
            type="number" 
            step="0.01" 
            class="input-field w-full"
            placeholder="0.00"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Category</label>
          <select v-model="singleForm.category" class="input-field w-full" required>
            <option value="">Select category</option>
            <option value="personal_care">Personal Care</option>
            <option value="health_fitness">Health & Fitness</option>
            <option value="food_dining">Food & Dining</option>
            <option value="gas_transport">Gas & Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="shopping_net">Online Shopping</option>
            <option value="grocery_net">Online Grocery</option>
            <option value="grocery_pos">Grocery Store</option>
            <option value="shopping_pos">Retail Shopping</option>
            <option value="misc_net">Miscellaneous Online</option>
            <option value="misc_pos">Miscellaneous Retail</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Merchant</label>
          <input 
            v-model="singleForm.merchant" 
            type="text" 
            class="input-field w-full"
            placeholder="Merchant name"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Gender</label>
          <select v-model="singleForm.gender" class="input-field w-full" required>
            <option value="">Select gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-300 mb-2">Job</label>
          <input 
            v-model="singleForm.job" 
            type="text" 
            class="input-field w-full"
            placeholder="Job title"
            required
          />
        </div>

        <div class="md:col-span-2">
          <button 
            type="submit" 
            :disabled="predicting"
            class="btn-primary disabled:opacity-50"
          >
            {{ predicting ? 'Analyzing...' : 'Predict Fraud Risk' }}
          </button>
        </div>
      </form>

      <!-- Error Display -->
      <div v-if="error" class="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
        <h3 class="text-lg font-semibold text-red-400 mb-2">Error</h3>
        <p class="text-red-300">{{ error }}</p>
      </div>

      <!-- Single Prediction Result -->
      <div v-if="singleResult" class="mt-6 p-4 bg-gray-700/50 rounded-lg">
        <h3 class="text-lg font-semibold text-white mb-4">Prediction Result</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="text-center">
            <div 
              :class="singleResult.is_fraud ? 'text-red-400' : 'text-green-400'"
              class="text-2xl font-bold"
            >
              {{ singleResult.is_fraud ? 'FRAUD' : 'LEGITIMATE' }}
            </div>
            <div class="text-sm text-gray-400">Classification</div>
          </div>
          <div class="text-center">
            <div 
              :class="singleResult.fraud_probability > 0.7 ? 'text-red-400' : singleResult.fraud_probability > 0.4 ? 'text-yellow-400' : 'text-green-400'"
              class="text-2xl font-bold"
            >
              {{ (singleResult.fraud_probability * 100).toFixed(1) }}%
            </div>
            <div class="text-sm text-gray-400">Fraud Probability</div>
          </div>
          <div class="text-center">
            <div 
              :class="getRiskLevelColor(singleResult.risk_level)"
              class="text-2xl font-bold"
            >
              {{ singleResult.risk_level }}
            </div>
            <div class="text-sm text-gray-400">Risk Level</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-400">
              {{ singleResult.transaction_id.substring(0, 8) }}...
            </div>
            <div class="text-sm text-gray-400">Transaction ID</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Batch Prediction -->
    <div v-if="activeTab === 'batch'" class="space-y-6">
      <!-- File Upload -->
      <div class="card p-6">
        <h2 class="text-xl font-semibold text-white mb-6">Batch Prediction</h2>
        
        <div class="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
          <CloudArrowUpIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-white mb-2">Upload CSV File</h3>
          <p class="text-gray-400 mb-4">CSV should contain columns: amt, category, merchant, gender, job</p>
          <input 
            type="file" 
            @change="handleFileUpload"
            accept=".csv"
            class="hidden"
            ref="fileInput"
          />
          <button 
            @click="$refs.fileInput.click()"
            class="btn-primary"
          >
            Choose File
          </button>
          <p class="text-sm text-gray-500 mt-2">
            Supports CSV files up to 50MB
          </p>
        </div>

        <div v-if="uploadedFile" class="mt-4 p-4 bg-gray-700/50 rounded-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium text-white">{{ uploadedFile.name }}</p>
              <p class="text-sm text-gray-400">{{ formatFileSize(uploadedFile.size) }}</p>
            </div>
            <button 
              @click="processBatch" 
              :disabled="processingBatch"
              class="btn-primary disabled:opacity-50"
            >
              {{ processingBatch ? 'Processing...' : 'Process Batch' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Batch Results -->
      <div v-if="batchResults.length > 0" class="card p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-white">Batch Results</h3>
          <div class="flex space-x-2">
            <button @click="exportResults" class="btn-secondary text-sm">Export Results</button>
            <button @click="downloadReport" class="btn-primary text-sm">Download Report</button>
          </div>
        </div>

        <!-- Results Summary -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div class="text-center p-4 bg-gray-700/50 rounded-lg">
            <div class="text-2xl font-bold text-blue-400">{{ batchSummary.total }}</div>
            <div class="text-sm text-gray-400">Total Processed</div>
          </div>
          <div class="text-center p-4 bg-gray-700/50 rounded-lg">
            <div class="text-2xl font-bold text-green-400">{{ batchSummary.legitimate }}</div>
            <div class="text-sm text-gray-400">Legitimate</div>
          </div>
          <div class="text-center p-4 bg-gray-700/50 rounded-lg">
            <div class="text-2xl font-bold text-red-400">{{ batchSummary.fraud }}</div>
            <div class="text-sm text-gray-400">Fraud Detected</div>
          </div>
          <div class="text-center p-4 bg-gray-700/50 rounded-lg">
            <div class="text-2xl font-bold text-yellow-400">{{ batchSummary.high_risk }}</div>
            <div class="text-sm text-gray-400">High Risk</div>
          </div>
          <div class="text-center p-4 bg-gray-700/50 rounded-lg">
            <div class="text-2xl font-bold text-purple-400">{{ (batchSummary.fraud_rate * 100).toFixed(1) }}%</div>
            <div class="text-sm text-gray-400">Fraud Rate</div>
          </div>
        </div>

        <!-- Results Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-700">
                <th class="text-left py-3 text-gray-400">Transaction ID</th>
                <th class="text-left py-3 text-gray-400">Row #</th>
                <th class="text-left py-3 text-gray-400">Fraud Probability</th>
                <th class="text-left py-3 text-gray-400">Risk Level</th>
                <th class="text-left py-3 text-gray-400">Classification</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="result in paginatedResults" 
                :key="result.transaction_id"
                class="border-b border-gray-700/50"
              >
                <td class="py-3 text-blue-400">{{ result.transaction_id.substring(0, 8) }}...</td>
                <td class="py-3 text-gray-300">{{ result.originalIndex + 1 }}</td>
                <td class="py-3">
                  <span 
                    :class="result.fraud_probability > 0.7 ? 'text-red-400' : result.fraud_probability > 0.4 ? 'text-yellow-400' : 'text-green-400'"
                  >
                    {{ (result.fraud_probability * 100).toFixed(1) }}%
                  </span>
                </td>
                <td class="py-3">
                  <span 
                    :class="getRiskLevelColor(result.risk_level)"
                    class="px-2 py-1 rounded-full text-xs"
                  >
                    {{ result.risk_level }}
                  </span>
                </td>
                <td class="py-3">
                  <span 
                    :class="result.is_fraud ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'"
                    class="px-2 py-1 rounded-full text-xs"
                  >
                    {{ result.is_fraud ? 'FRAUD' : 'LEGITIMATE' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between mt-6">
          <div class="text-sm text-gray-400">
            Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, batchResults.length) }} of {{ batchResults.length }} results
          </div>
          <div class="flex space-x-2">
            <button 
              @click="currentPage--"
              :disabled="currentPage <= 1"
              class="btn-secondary text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <button 
              @click="currentPage++"
              :disabled="currentPage >= totalPages"
              class="btn-secondary text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { CloudArrowUpIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  middleware: 'auth'
})

// Configuration - Update this with your FastAPI backend URL
const API_BASE_URL = 'http://localhost:8000' // Change this to your FastAPI backend URL

const activeTab = ref('single')
const predicting = ref(false)
const processingBatch = ref(false)
const uploadedFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement>()
const error = ref('')

const singleForm = reactive({
  amt: '',
  category: '',
  merchant: '',
  gender: '',
  job: ''
})

interface PredictionResponse {
  is_fraud: boolean
  fraud_probability: number
  risk_level: string
  transaction_id: string
}

interface BatchSummary {
  total_transactions: number
  fraud_detected: number
  fraud_rate: number
  average_fraud_probability: number
  high_risk_transactions: number
}

interface BatchPredictionResponse {
  predictions: PredictionResponse[]
  summary: BatchSummary
}

const singleResult = ref<PredictionResponse | null>(null)
const batchResults = ref<(PredictionResponse & { amt: number; originalIndex: number })[]>([])
const currentPage = ref(1)
const pageSize = 10

// Store batch summary separately since it comes from API
const batchSummaryData = ref<any>({
  total: 0,
  fraud: 0,
  legitimate: 0,
  high_risk: 0,
  fraud_rate: 0,
  average_fraud_probability: 0
})

const batchSummary = computed(() => batchSummaryData.value)

const totalPages = computed(() => Math.ceil(batchResults.value.length / pageSize))

const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return batchResults.value.slice(start, end)
})

const predictSingle = async () => {
  predicting.value = true
  error.value = ''
  singleResult.value = null
  
  try {
    const requestBody = {
      amt: parseFloat(singleForm.amt),
      category: singleForm.category,
      merchant: singleForm.merchant,
      gender: singleForm.gender,
      job: singleForm.job
    }

    const response = await $fetch<PredictionResponse>(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestBody
    })
    
    singleResult.value = response
  } catch (err: any) {
    error.value = err.data?.detail || err.message || 'An error occurred while making the prediction'
    console.error('Prediction error:', err)
  } finally {
    predicting.value = false
  }
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    uploadedFile.value = target.files[0]
    error.value = ''
  }
}

const processBatch = async () => {
  if (!uploadedFile.value) return
  
  processingBatch.value = true
  error.value = ''
  
  try {
    // Create FormData to send file
    const formData = new FormData()
    formData.append('file', uploadedFile.value)

    // Use $fetch with FormData for file upload
    const response = await $fetch<BatchPredictionResponse>(`${API_BASE_URL}/predict/batch`, {
      method: 'POST',
      body: formData
    })
    
    // Process the batch response
    batchResults.value = response.predictions.map((prediction, index) => ({
      ...prediction,
      // Since we don't have the original amount in the response, we'll use index for display
      // In a real scenario, you might want to store original data or modify the API response
      amt: 0, // Will be hidden in the table since we don't have this data
      originalIndex: index
    }))
    
    // Store summary data
    batchSummaryData.value = {
      total: response.summary.total_transactions || response.predictions.length,
      fraud: response.summary.fraud_detected || response.predictions.filter(p => p.is_fraud).length,
      legitimate: (response.summary.total_transactions || response.predictions.length) - (response.summary.fraud_detected || response.predictions.filter(p => p.is_fraud).length),
      high_risk: response.summary.high_risk_transactions || response.predictions.filter(p => p.risk_level === 'HIGH').length,
      fraud_rate: response.summary.fraud_rate || 0,
      average_fraud_probability: response.summary.average_fraud_probability || 0
    }
    
    currentPage.value = 1
    
  } catch (err: any) {
    error.value = err.data?.detail || err.message || 'An error occurred while processing the batch'
    console.error('Batch processing error:', err)
  } finally {
    processingBatch.value = false
  }
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getRiskLevelColor = (riskLevel: string) => {
  switch (riskLevel) {
    case 'LOW': return 'text-green-400'
    case 'MEDIUM': return 'text-yellow-400'
    case 'HIGH': return 'text-red-400'
    default: return 'text-gray-400'
  }
}

const exportResults = () => {
  if (batchResults.value.length === 0) return
  
  const csvContent = [
    'transaction_id,row_number,is_fraud,fraud_probability,risk_level',
    ...batchResults.value.map(result => 
      `${result.transaction_id},${result.originalIndex + 1},${result.is_fraud},${result.fraud_probability},${result.risk_level}`
    )
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `fraud_predictions_${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

const downloadReport = () => {
  if (batchResults.value.length === 0) return
  
  const report = {
    generated_at: new Date().toISOString(),
    summary: batchSummaryData.value,
    total_predictions: batchResults.value.length,
    results: batchResults.value.map(result => ({
      transaction_id: result.transaction_id,
      row_number: result.originalIndex + 1,
      is_fraud: result.is_fraud,
      fraud_probability: result.fraud_probability,
      risk_level: result.risk_level
    }))
  }
  
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `fraud_detection_report_${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}
</script>