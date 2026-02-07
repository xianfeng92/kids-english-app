import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 生产环境使用 /kids-english-app/，开发环境使用根路径
  base: process.env.NODE_ENV === 'production' ? '/kids-english-app/' : '/',
  server: {
    port: 3000,
    open: true // 启动时自动打开浏览器
  }
})