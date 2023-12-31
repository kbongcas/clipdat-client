import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import packageJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/clipsapi": {
        target: "https://clipsservice.calmmeadow-d45ed0b7.eastus.azurecontainerapps.io",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/clipsapi/, "")
      },
      "/uploadapi": {
        target: "https://clipuploader.calmmeadow-d45ed0b7.eastus.azurecontainerapps.io",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/uploadapi/, "")
      }
    }
  },
  plugins: [react()],
  define: {
    __PACKAGE_JSON_VERSION__: JSON.stringify(packageJson.version),
  },
})
