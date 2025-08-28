<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700">
      <div class="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 class="text-xl font-bold text-blue-400">CCFD</h1>
      </div>
      
      <nav class="mt-8">
        <div class="px-4 space-y-2">
          <NuxtLink 
            to="/dashboard" 
            class="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
            active-class="bg-blue-600 text-white"
          >
            <ChartBarIcon class="w-5 h-5 mr-3" />
            Dashboard
          </NuxtLink>
          
          <NuxtLink 
            to="/training" 
            class="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
            active-class="bg-blue-600 text-white"
          >
            <CogIcon class="w-5 h-5 mr-3" />
            Model Training
          </NuxtLink>
          
          <NuxtLink 
            to="/prediction" 
            class="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
            active-class="bg-blue-600 text-white"
          >
            <MagnifyingGlassIcon class="w-5 h-5 mr-3" />
            Prediction
          </NuxtLink>
          
          <NuxtLink 
            to="/analysis" 
            class="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
            active-class="bg-blue-600 text-white"
          >
            <ChartPieIcon class="w-5 h-5 mr-3" />
            Analysis
          </NuxtLink>
          
          <!-- <NuxtLink 
            to="/reports" 
            class="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
            active-class="bg-blue-600 text-white"
          >
            <DocumentTextIcon class="w-5 h-5 mr-3" />
            Reports
          </NuxtLink> -->
        </div>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="pl-64">
      <!-- Header -->
      <header class="bg-gray-800 border-b border-gray-700 h-16 flex items-center justify-between px-6">
        <div class="flex-1">
          <h2 class="text-lg font-semibold text-gray-100">{{ pageTitle }}</h2>
        </div>
        
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-sm text-gray-300">System Online</span>
          </div>
          
          <div class="flex items-center space-x-2">
            <UserCircleIcon class="w-8 h-8 text-gray-400" />
            <span class="text-sm text-gray-300">Blessing</span>
            <button @click="logout" class="text-sm text-red-400 hover:text-red-300">
              Logout
            </button>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  ChartBarIcon, 
  CogIcon, 
  MagnifyingGlassIcon, 
  ChartPieIcon, 
  DocumentTextIcon,
  UserCircleIcon
} from '@heroicons/vue/24/outline'

const { user, logout } = useAuth()
const route = useRoute()

const pageTitle = computed(() => {
  const titles = {
    '/dashboard': 'Dashboard Overview',
    '/training': 'Model Training',
    '/prediction': 'Fraud Prediction',
    '/analysis': 'Data Analysis',
    '/reports': 'Report Generation'
  }
  return titles[route.path] || 'FraudGuard'
})
</script>