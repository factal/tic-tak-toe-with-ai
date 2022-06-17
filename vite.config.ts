import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components/': `${__dirname}/src/components/`,
      '@libs/': `${__dirname}/src/libs/`,
      '@styles/': `${__dirname}/src/styles/`
    }
  },
})
