import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import WindiCSS from 'vite-plugin-windicss';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import { UserConfigExport, ConfigEnv, loadEnv } from 'vite';
import { configMockPlugin } from './src/utils/mock';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  return {
    plugins: [
      vue(),
      WindiCSS(),
      Components({
        dts: 'src/types/components.d.ts',
        resolvers: [IconsResolver()]
      }),
      Icons(),
      AutoImport({
        dts: 'src/types/auto-imports.d.ts',
        eslintrc: {
          enabled: true
        },
        imports: [
          // presets
          'vue',
          'vue-router'
        ]
      }),
      configMockPlugin(env)
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@pages': resolve(__dirname, './src/pages')
      }
    },
    server: {
      proxy: {
        // '/api': {
        //   target: env.VITE_API_URL,
        //   changeOrigin: true,
        //   ws: true,
        //   rewrite: (path) => path.replace(new RegExp(`^/api/iot`), '')
        // }
      }
    }
  };
};
