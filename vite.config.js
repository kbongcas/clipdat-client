import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "")
      },
      "/aapi": {
        target: "",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/aapi/, "")
      }
    }
  },
  plugins: [react()],
})
