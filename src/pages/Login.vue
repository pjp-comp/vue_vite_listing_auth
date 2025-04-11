<!-- <template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input v-model="username" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
        <p v-if="error">{{ error }}</p>
      </form>
    </div>
  </template> -->
  
  <template>
    <div class="flex justify-center items-center h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
        <form @submit.prevent="login">
          <input v-model="username" placeholder="Username" class="w-full p-2 mb-4 border rounded" />
          <input v-model="password" type="password" placeholder="Password" class="w-full p-2 mb-4 border rounded" />
          <button type="submit" class="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Login
          </button>
        </form>
        <p v-if="error" class="text-red-500 text-center mt-2">{{ error }}</p>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  const username = ref('')
  const password = ref('')
  const error = ref('')
  const router = useRouter()
  
  const login = async () => {
    try {
      const res = await axios.post('https://dummyjson.com/auth/login', {
        username: username.value,
        password: password.value,
        expiresInMins: 5,
      })
      if(res.message){
        error.value = res.message;
        return;
      }
   
      const token = res.data.accessToken
      const refreshToken = res.data.refreshToken

      localStorage.setItem('accessToken', token)
      localStorage.setItem('refreshToken', refreshToken)

      router.push('/products')
      
    } catch (err) {
      error.value = err.response.data.message || 'Login failed'
    }
  }
  </script>
  