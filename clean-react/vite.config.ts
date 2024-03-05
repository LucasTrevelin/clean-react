import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test.setup.ts',
    reporters: ['default', 'html'],
    coverage: {
      all: true,
      provider: 'istanbul', // or 'v8'
      exclude: ['src/__mocks__/', 'html/**', 'public/**', '*.cjs'],
      reporter: ['text', 'html', 'lcov']
    },
    chaiConfig: {
      truncateThreshold: Infinity
    }
  }
})
