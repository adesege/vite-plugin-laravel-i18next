import { builtinModules } from 'module'
import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: ['package.json', 'README.md', 'LICENSE', 'CHANGELOG.md', 'npm-shrinkwrap.json', 'package-lock.json'].map(item => ({
        src: item,
        dest: './'
      })),
    }),
    dts({ tsconfigPath: './tsconfig.build.json' })
  ],
  build: {
    lib: {
      formats: ['es'],
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'vite-plugin-laravel-i18next',
      fileName: 'index',
    },
    rollupOptions: {
      external: [...builtinModules, 'vite', 'chokidar', 'path', 'fs', 'glob', 'php-parser'],
    },
  },
})
