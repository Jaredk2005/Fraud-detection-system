<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
    <!-- Navigation -->
    <nav class="flex items-center justify-between p-6">
      <div class="flex items-center space-x-2">
        <div class="w-8 h-8 bg-blue-500 rounded-lg"></div>
        <span class="text-xl font-bold text-white">FraudGuard</span>
      </div>
      
      <div class="space-x-4">
        <button class="text-gray-300 hover:text-white transition-colors">Features</button>
        <button class="text-gray-300 hover:text-white transition-colors">Security</button>
        <button class="text-gray-300 hover:text-white transition-colors">About</button>
        <NuxtLink to="/login" class="btn-primary">Sign In</NuxtLink>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="max-w-7xl mx-auto px-6 py-20">
      <div class="text-center">
        <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
          Advanced Credit Card
          <span class="text-blue-400">Fraud Detection</span>
        </h1>
        
        <p class="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Protect your business with AI-powered fraud detection. Analyze millions of transactions in real-time 
          and prevent fraudulent activities with 98.7% accuracy.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/login" class="btn-primary text-lg px-8 py-4">
            Get Started
          </NuxtLink>
          <button class="btn-secondary text-lg px-8 py-4">
            Watch Demo
          </button>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mt-20">
        <div class="text-center">
          <div class="text-3xl font-bold text-blue-400">98.7%</div>
          <div class="text-gray-300">Detection Accuracy</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-blue-400">1.2M+</div>
          <div class="text-gray-300">Transactions Analyzed</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-blue-400">15.7K</div>
          <div class="text-gray-300">Frauds Prevented</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-blue-400">99.9%</div>
          <div class="text-gray-300">Uptime</div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="mt-32">
        <h2 class="text-3xl font-bold text-center text-white mb-16">
          Comprehensive Fraud Prevention
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card p-8 text-center">
            <div class="w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <ChartBarIcon class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-white mb-4">Real-time Analysis</h3>
            <p class="text-gray-300">Process and analyze transactions in real-time with advanced machine learning algorithms.</p>
          </div>
          
          <div class="card p-8 text-center">
            <div class="w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <ShieldCheckIcon class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-white mb-4">Advanced Security</h3>
            <p class="text-gray-300">Multi-layered security approach with behavioral analysis and pattern recognition.</p>
          </div>
          
          <div class="card p-8 text-center">
            <div class="w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <DocumentTextIcon class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-white mb-4">Compliance Reports</h3>
            <p class="text-gray-300">Generate detailed reports for regulatory compliance and internal audits.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChartBarIcon, ShieldCheckIcon, DocumentTextIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  layout: false
})
</script>