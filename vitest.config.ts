import { defineConfig, configDefaults } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['./tests/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      exclude: [...configDefaults.coverage?.exclude || [], 'src/plugin.ts', 'src/index.ts', 'playwright.config.ts'],
    }
  },
})
