import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import AutoImport from 'unplugin-auto-import/vite';
import createSvgIcon from './config/plugin/svg-icon';
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://182.92.201.19:8080/',
        // target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    port: 5174
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      }
    }
  },
  assetsInclude: ['**/*.gif'],
  plugins: [
    vue(),
    createSvgIcon(true),
    AutoImport({
      // 自动导入vue相关函数，如: ref、reactive、toRef等
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-import.d.ts',
      eslintrc: {
        // 改为 true 用于生成 eslint 配置（生成后改回 false，避免重复生成消耗）
        enabled: false,
      },
    }),
  ],
  publicDir: 'public',
})