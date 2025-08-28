<template>
  <NuxtLayout name="default">
  <div class="space-y-6">
    <!-- File Upload Section -->
    <div class="card p-6">
      <h2 class="text-xl font-semibold text-white mb-4">Upload Training Data</h2>
      <div class="space-y-4">
        <div class="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
          <input
            ref="fileInput"
            type="file"
            accept=".csv"
            @change="handleFileSelect"
            class="hidden"
          />
          <div v-if="!selectedFile" @click="$refs.fileInput.click()" class="cursor-pointer">
            <div class="text-4xl text-gray-400 mb-2">📄</div>
            <p class="text-gray-300">Click to select a CSV file</p>
            <p class="text-sm text-gray-500 mt-1">File must contain 'is_fraud' column</p>
          </div>
          <div v-else class="space-y-2">
            <div class="text-2xl text-green-400 mb-2">✓</div>
            <p class="text-white font-medium">{{ selectedFile.name }}</p>
            <p class="text-sm text-gray-400">{{ formatFileSize(selectedFile.size) }}</p>
            <button @click="clearFile" class="text-red-400 hover:text-red-300 text-sm mt-2">
              Remove file
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Training Status -->
    <div class="card p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-white">Model Training Status</h2>
        <button 
          @click="startTraining"
          :disabled="isTraining || !selectedFile"
          class="btn-primary disabled:opacity-50"
        >
          {{ isTraining ? 'Training in Progress...' : 'Start Training' }}
        </button>
      </div>

      <!-- Error Display -->
      <div v-if="trainingError" class="mb-4 p-4 bg-red-900/30 border border-red-700 rounded-lg">
        <p class="text-red-400 text-sm">{{ trainingError }}</p>
      </div>

      <div v-if="isTraining" class="space-y-4">
        <div class="flex justify-between text-sm">
          <span class="text-gray-400">Progress</span>
          <span class="text-blue-400">{{ trainingProgress }}%</span>
        </div>
        <div class="w-full bg-gray-700 rounded-full h-2">
          <div 
            class="bg-blue-500 h-2 rounded-full transition-all duration-300"
            :style="{ width: trainingProgress + '%' }"
          ></div>
        </div>
        <p class="text-sm text-gray-400">{{ currentStep }}</p>
      </div>

      <div v-else-if="lastTraining.accuracy !== null && lastTraining.modelId" class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-green-400">{{ (lastTraining.accuracy * 100).toFixed(2) }}%</div>
          <div class="text-sm text-gray-400">Accuracy</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-400">{{ lastTraining.samples || 'N/A' }}</div>
          <div class="text-sm text-gray-400">Training Samples</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-purple-400">{{ (lastTraining.trainingTime || 0).toFixed(1) }}s</div>
          <div class="text-sm text-gray-400">Training Time</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-orange-400">{{ lastTraining.modelId ? lastTraining.modelId.slice(0, 8) + '...' : 'N/A' }}</div>
          <div class="text-sm text-gray-400">Model ID</div>
        </div>
      </div>
      
      <div v-else class="text-center py-8">
        <div class="text-gray-400 text-lg mb-2">No model trained yet</div>
        <div class="text-gray-500 text-sm">Upload a CSV file and start training to see results</div>
      </div>
    </div>

    <!-- Training Configuration -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-white mb-4">Training Configuration</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Algorithm</label>
            <select v-model="config.algorithm" class="input-field w-full" disabled>
              <option value="logistic_regression">Logistic Regression</option>
              <option value="random_forest">Random Forest</option>
              <option value="xgboost">XGBoost</option>
              <option value="neural_network">Neural Network</option>
            </select>
            <p class="text-xs text-gray-500 mt-1">Currently using Logistic Regression (FastAPI backend)</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Test Split</label>
            <select v-model="config.testSplit" class="input-field w-full" disabled>
              <option value="0.2">20% (Default)</option>
              <option value="0.3">30%</option>
              <option value="0.1">10%</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Random State</label>
            <input 
              v-model="config.randomState" 
              type="number" 
              class="input-field w-full"
              disabled
            />
            <p class="text-xs text-gray-500 mt-1">Fixed at 42 for reproducibility</p>
          </div>

          <div class="flex items-center space-x-2">
            <input 
              id="autoRetrain" 
              v-model="config.autoRetrain" 
              type="checkbox" 
              class="rounded border-gray-600 bg-gray-700 text-blue-500"
              disabled
            />
            <label for="autoRetrain" class="text-sm text-gray-300">
              Enable automatic retraining (Coming soon)
            </label>
          </div>
        </div>
      </div>

      <!-- Training History -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-white mb-4">Training History</h3>
        <div class="space-y-3 max-h-64 overflow-y-auto">
          <div v-if="trainingHistory.length === 0" class="text-center py-4">
            <div class="text-gray-400">No training history yet</div>
          </div>
          <div 
            v-for="session in trainingHistory" 
            :key="session.id"
            class="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
          >
            <div>
              <div class="font-medium text-white">{{ session.algorithm }}</div>
              <div class="text-sm text-gray-400">{{ formatDate(session.date) }}</div>
            </div>
            <div class="text-right">
              <div class="font-medium text-green-400">{{ (session.accuracy * 100).toFixed(2) }}%</div>
              <div class="text-sm text-gray-400">{{ session.trainingTime.toFixed(1) }}s</div>
              <div class="text-xs text-gray-500 mt-1">ID: {{ session.modelId?.slice(0, 8) }}...</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Feature Importance -->
    <div class="card p-6" v-if="featureImportance.length > 0">
      <h3 class="text-lg font-semibold text-white mb-4">Feature Importance</h3>
      <div class="space-y-4">
        <div v-for="feature in featureImportance" :key="feature.name" class="flex items-center">
          <div class="w-32 text-sm text-gray-300">{{ feature.name }}</div>
          <div class="flex-1 mx-4">
            <div class="w-full bg-gray-700 rounded-full h-2">
              <div 
                class="bg-blue-500 h-2 rounded-full"
                :style="{ width: feature.importance + '%' }"
              ></div>
            </div>
          </div>
          <div class="w-12 text-sm text-blue-400 text-right">{{ feature.importance }}%</div>
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

// Reactive state
const isTraining = ref(false)
const trainingProgress = ref(0)
const currentStep = ref('')
const selectedFile = ref<File | null>(null)
const trainingError = ref('')

// Configuration (mostly display-only to match FastAPI backend)
const config = reactive({
  algorithm: 'logistic_regression',
  testSplit: '0.2',
  randomState: 42,
  autoRetrain: false
})

// Training results
const lastTraining = ref({
  accuracy: null,
  samples: 0,
  trainingTime: null,
  modelId: null
})

// Training history
const trainingHistory = ref([
  // Will be populated with actual training results
])

// Feature importance (placeholder - would come from backend)
const featureImportance = ref([])

// FastAPI base URL - adjust as needed
const API_BASE_URL = 'http://localhost:8000' // Change this to your FastAPI server URL

// File handling methods
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0]
    trainingError.value = ''
  }
}

const clearFile = () => {
  selectedFile.value = null
  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
  if (fileInput) {
    fileInput.value = ''
  }
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Training method that calls FastAPI endpoint
const startTraining = async () => {
  if (!selectedFile.value) {
    trainingError.value = 'Please select a CSV file first'
    return
  }

  isTraining.value = true
  trainingProgress.value = 0
  trainingError.value = ''
  currentStep.value = 'Uploading file and starting training...'

  try {
    // Create FormData for file upload
    const formData = new FormData()
    formData.append('file', selectedFile.value)

    // Simulate progress updates while making the actual API call
    const progressInterval = setInterval(() => {
      if (trainingProgress.value < 90) {
        trainingProgress.value += Math.random() * 10
        if (trainingProgress.value < 30) {
          currentStep.value = 'Uploading and validating file...'
        } else if (trainingProgress.value < 60) {
          currentStep.value = 'Preprocessing data...'
        } else if (trainingProgress.value < 90) {
          currentStep.value = 'Training model...'
        }
      }
    }, 500)

    // Make API call to FastAPI training endpoint
    const response = await fetch(`${API_BASE_URL}/train`, {
      method: 'POST',
      body: formData,
    })

    clearInterval(progressInterval)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || 'Training failed')
    }

    const result = await response.json()
    
    // Check if training was successful
    if (!result.success) {
      throw new Error(result.message || 'Training failed')
    }
    
    // Complete the progress
    trainingProgress.value = 100
    currentStep.value = result.message || 'Training completed successfully!'

    // Update training results
    lastTraining.value = {
      accuracy: result.accuracy,
      samples: 0, // FastAPI doesn't return this, could be added
      trainingTime: result.training_time,
      modelId: result.model_id
    }

    localStorage.clear()
    localStorage.setItem("accuracy", result.accuracy)
    localStorage.setItem("time", result.training_time)
    localStorage.setItem("model", result.model_id)
    // Add to training history
    trainingHistory.value.unshift({
      id: Date.now(),
      algorithm: 'Logistic Regression',
      date: new Date(),
      accuracy: result.accuracy,
      trainingTime: result.training_time,
      modelId: result.model_id
    })

    // Clear the selected file
    setTimeout(() => {
      selectedFile.value = null
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      if (fileInput) {
        fileInput.value = ''
      }
    }, 2000)

  } catch (error: any) {
    clearInterval(progressInterval)
    trainingError.value = error.message || 'Training failed'
    console.error('Training error:', error)
  } finally {
    setTimeout(() => {
      isTraining.value = false
    }, 1000)
  }
}

const formatDate = (date: Date) => {
  return format(date, 'MMM dd, yyyy HH:mm')
}

// Load any existing training history from localStorage on component mount
onMounted(() => {
  // You could load training history from localStorage or make an API call
  // to get previous training sessions if your backend supports it
})
</script>

<style scoped>
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors;
}

.input-field {
  @apply bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}

.card {
  @apply bg-gray-800 rounded-lg border border-gray-700;
}
</style>