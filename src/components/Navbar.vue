<!-- src/components/Navbar.vue -->
<template>
    <nav class="bg-gray-800 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="font-bold text-xl">Vue Shop</div>
        <div v-if="authStore.isAuthenticated" class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <img 
              v-if="authStore.user?.image" 
              :src="authStore.user.image" 
              alt="User Avatar" 
              class="w-8 h-8 rounded-full"
            />
            <span>{{ authStore.user?.firstName }} {{ authStore.user?.lastName }}</span>
          </div>
          <button @click="logout" class="btn btn-primary">Logout</button>
        </div>
      </div>
    </nav>  
  </template>
  
  <script setup>
  import { useAuthStore } from '../stores/auth'
  import { useRouter } from 'vue-router'
  
  const authStore = useAuthStore()
  const router = useRouter()
  
  const logout = () => {
    authStore.logout()
    router.push('/login')
  }
  </script>