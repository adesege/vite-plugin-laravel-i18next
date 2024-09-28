import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'empty locales folder',
      testMatch: /global-setup\.ts/,
      teardown: 'remove locales folder',
    },
    {
      name: 'remove locales folder',
      testMatch: /global-teardown\.ts/,
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['empty locales folder'],
    },
  ],
  webServer: {
    command: 'yarn dev:test',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
