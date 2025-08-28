export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = useState('auth.isAuthenticated', () => false)
  
  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }
})