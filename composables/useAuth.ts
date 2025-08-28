export const useAuth = () => {
  const isAuthenticated = useState('auth.isAuthenticated', () => false)
  const user = useState('auth.user', () => null)

  const login = async (credentials: { email: string; password: string }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (credentials.email === 'blessing@gmail.com' && credentials.password === 'password') {
      isAuthenticated.value = true
      user.value = {
        name: 'Dr. Sarah Chen',
        email: 'blessing@gmail.com',
        role: 'Data Scientist'
      }
      return { success: true }
    }
    
    return { success: false, error: 'Invalid credentials' }
  }

  const logout = () => {
    isAuthenticated.value = false
    user.value = null
    navigateTo('/login')
  }

  return {
    isAuthenticated: readonly(isAuthenticated),
    user: readonly(user),
    login,
    logout
  }
}