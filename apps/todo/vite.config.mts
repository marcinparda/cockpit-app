/// <reference types='vitest' />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env =
    mode === 'production' ? { production: true } : { production: false };

  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/todo',
    server: {
      port: 4201,
      host: 'localhost',
    },
    preview: {
      port: 4300,
      host: 'localhost',
    },
    plugins: [
      vue(),
      nxViteTsPaths(),
      tailwindcss(),
      nxCopyAssetsPlugin(['*.md']),
    ],
    build: {
      outDir: '../../dist/apps/todo',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    test: {
      watch: false,
      globals: true,
      environment: 'jsdom',
      include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default'],
      coverage: {
        reportsDirectory: '../../coverage/apps/todo',
        provider: 'v8' as const,
      },
    },
    define: {
      'process.env': env,
    },
  };
});
