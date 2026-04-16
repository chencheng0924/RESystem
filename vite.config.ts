import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
// import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  base: '/repair/',
  build: {
    chunkSizeWarningLimit: 1500,
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 拆大型庫
          if (id.includes("node_modules")) {
            if (id.includes("monaco-editor")) return "monaco";
            if (id.includes("echarts")) return "echarts";

            // 拆出工具類庫
            if (
              id.includes("lodash") ||
              id.includes("uuid") ||
              id.includes("dayjs")
            )
              return "vendor-utils";

            // 其餘常用庫集中
            return "vendor";
          }
        },
      }
    }
  },
  envDir: 'src',
  plugins: [
    vue(),
    //vueJsx({}),
    Components({
      globs: [
        'src/**/*.vue',
        '!src/components/ui/**/*.vue',
        '!src/components/ai-elements/**/*.vue',
      ],
      resolvers: [
        PrimeVueResolver()
      ]
    }),
    // visualizer({
    //   filename: 'dist/stats.html',
    //   open: true, // 打包後自動開啟分析頁面
    //   gzipSize: true,
    //   brotliSize: true
    // })

  ],
  // plugins: [vue(), basicSsl()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    allowedHosts: ['0858-2001-b400-e108-3c94-381e-5b79-ac80-6c9b.ngrok-free.app'],
    // host: '0.0.0.0', 
    proxy: {
      '/bkapi': {
        ws: true,
        target: 'https://dev-maas.foxconn.com',
        changeOrigin: true,
        secure: false,
        rewrite: (pathTemp) => pathTemp.replace(/^\/bkapi/, '')
      },
      '/eventhub': {
        target: 'https://dev-maas.foxconn.com/rai/eventhub',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/eventhub/, '')
      },
      '/api': {
        target: 'https://unexcusable-linwood-plaided.ngrok-free.dev',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('ngrok-skip-browser-warning', '69420');
          });
        },
      },
    }
  }
})
