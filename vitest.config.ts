import { defineConfig } from 'vitest/config'

export default defineConfig({
  server: {
    allowedHosts: ['localhost', '.mcprev.cn'],
  },

  test: {
    include: ['**/*.spec.ts', '**/*.test.ts'],
    coverage: {
      enabled: true,
    },
  },
})
