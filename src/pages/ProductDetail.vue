<template>
     <!-- Logout Button -->
     <div class="flex justify-end p-4">
      <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all">
        Logout
      </button>
    </div>
    
    <div class="container mx-auto p-4">
      <div v-if="isLoading" class="text-center py-4">Loading...</div>
      <div v-if="error" class="text-red-500 text-center py-4">{{ error }}</div>
  
      <div v-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img :src="product.images[0]" alt="" class="w-full h-96 object-cover rounded-lg shadow-lg">
        <div class="space-y-4">
          <h2 class="text-3xl font-bold">{{ product.title }}</h2>
          <p class="text-xl text-gray-600">{{ product.description }}</p>
          <p class="font-semibold text-lg text-gray-900">{{ product.price | currency }}</p>
          <p class="text-sm text-gray-500">Category: {{ product.category }}</p>
          <button class="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition-all">Add to Cart</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>

  import api from '../api/axiosInstance';
  
  export default {
    data() {
      return {
        product: null,
        isLoading: false,
        error: null,
      };
    },
    mounted() {
      this.fetchProduct();
    },
    methods: {
      async fetchProduct() {
        this.isLoading = true;
        try {
          const response = await api.get(`products/${this.$route.params.id}`);
          this.product = response.data;
        } catch (error) {
          this.error = 'Failed to fetch product details';
          console.error(error);
        } finally {
          this.isLoading = false;
        }
      },
    },
  };
  </script>
  