<template>
    <div>
      <h2>You have been logged out.</h2>
      <router-link to="/">Go to Login</router-link>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  onMounted(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push('/')
  })
  </script>
  