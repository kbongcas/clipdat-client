import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/clipsapi": {
        target: "https://clipsservice.yellowbay-16887b3b.eastus.azurecontainerapps.io",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/clipsapi/, "")
      },
      "/uploadapi": {
        target: "https://clipuploader.yellowbay-16887b3b.eastus.azurecontainerapps.io",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/uploadapi/, "")
      }
    }
  },
  plugins: [react()],
})
