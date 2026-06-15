import { cpSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const copyStaticAssets = () => ({
  name: 'copy-static-assets',
  writeBundle() {
    const sourceDir = resolve(__dirname, 'tupian')
    const targetDir = resolve(__dirname, 'dist', 'tupian')

    if (existsSync(sourceDir)) {
      cpSync(sourceDir, targetDir, { recursive: true, force: true })
    }
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyStaticAssets()],
})
