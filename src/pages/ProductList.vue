<template>
  <div>
    <!-- Logout Button -->
    <div class="flex justify-end p-4">
      <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all">
        Logout
      </button>
    </div>

   
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-semibold mb-6 text-center">Product List</h1>

      <div v-if="isLoading" class="text-center py-4">Loading...</div>
      <div v-if="error" class="text-red-500 text-center py-4">{{ error }}</div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="product in products" :key="product.id" class="border rounded-lg p-4 shadow-md hover:shadow-xl transition-all">
          <img :src="product.thumbnail" alt="" class="w-full h-48 object-cover mb-4 rounded-md">
          
          <h2 class="font-semibold text-lg mb-2 text-gray-800">{{ product.title }}</h2>
          
          <p class="text-gray-500 mb-4 line-clamp-3">{{ product.description }}</p>
          
          <p class="font-bold text-lg mb-4 text-blue-600">${{ product.price }}</p>
          
          <router-link 
            :to="`/products/${product.id}`"
            class="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all"
          >
            View Details
          </router-link>
        </div>
      </div>

      <div class="flex justify-between items-center mt-6">
        <button
          @click="loadPrevPage"
          :disabled="skip <= 0"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all disabled:bg-gray-400"
        >
          Prev
        </button>
        <button
          @click="loadNextPage"
          :disabled="skip + limit >= total"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api/axiosInstance'; 
export default {
  data() {
    return {
      products: [],
      skip: 0,
      limit: 30,
      total: 0,
      isLoading: false,
      error: null,
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      this.isLoading = true;
      try {
        const response = await api.get(`products?skip=${this.skip}&limit=${this.limit}`);
        this.products = response.data.products;
        this.total = response.data.total;
      } catch (error) {
        this.error = 'Failed to fetch products';
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    loadPrevPage() {
      if (this.skip > 0) {
        this.skip -= this.limit;
        this.fetchProducts();
      }
    },
    loadNextPage() {
      if (this.skip + this.limit < this.total) {
        this.skip += this.limit;
        this.fetchProducts();
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/logout');
    },
  },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
