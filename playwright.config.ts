import { defineConfig } from '@playwright/test'

const PORT = 9847

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: `http://localhost:${PORT}`,
  },
  webServer: {
    command: `pnpm build && pnpm exec serve -p ${PORT} ./out`,
    port: PORT,
    reuseExistingServer: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
})
