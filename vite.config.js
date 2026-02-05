import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/kids-english-app/',
  server: {
    port: 3000,
    open: true // 启动时自动打开浏览器
  }
})