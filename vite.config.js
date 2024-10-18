import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
  ],
    server: {
        port: 4202,
        host: '0.0.0.0',
        open: false,
        proxy: {
            "/api": {
                target: 'http://127.0.0.1:8080/api',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '')
            },
            "/static": {
                target: 'http://127.0.0.1:8080/static',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/static/, '')
            }
        }
    },
    base: '/',
    build:{
        outDir: "dist/ele",
        assetsDir: 'static',
        modulePreload: true,
        emptyOutDir: true,
    }
})
