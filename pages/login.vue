<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="mx-auto w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
          <ShieldCheckIcon class="w-8 h-8 text-white" />
        </div>
        <h2 class="text-3xl font-bold text-white">Sign in to CCFD</h2>
        <p class="mt-2 text-gray-400">Access your fraud detection dashboard</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
            Email address
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="input-field w-full"
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            class="input-field w-full"
            placeholder="Enter your password"
          />
        </div>

        <div v-if="error" class="text-red-400 text-sm text-center">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full btn-primary py-3 text-lg disabled:opacity-50"
        >
          <span v-if="loading">Signing in...</span>
          <span v-else>Sign in</span>
        </button>
      </form>

      <div class="text-center text-sm text-gray-400">
        <p>Demo credentials:</p>
        <p>Email: blessing@gmail.com</p>
        <p>Password: password</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShieldCheckIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  layout: false
})

const { login } = useAuth()
const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const result = await login(form)
    if (result.success) {
      await router.push('/dashboard')
    } else {
      error.value = result.error || 'Login failed'
    }
  } catch (err) {
    error.value = 'An error occurred during login'
  } finally {
    loading.value = false
  }
}
</script>