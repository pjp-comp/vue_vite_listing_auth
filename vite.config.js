import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import Inspector from '@vitejs/plugin-vue-inspector'
import VueInspector from 'vite-plugin-vue-inspector';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueInspector({
      toggleButtonVisibility: 'always'
    }),
    // Inspector({
    //   toggleButtonVisibility: 'always'
    // })
  ],
  server: {
    port: 3000
  }
})
