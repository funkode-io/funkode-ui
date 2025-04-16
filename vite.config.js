import { defineConfig } from 'vite'
import webcPlugin from 'vite-plugin-webc'

export default defineConfig({
  plugins: [
    webcPlugin({
      // WebC plugin options here
      components: ['src/components/**/*.webc'],
      transformIncludeFilter: (id) => id.endsWith('.webc')
    })
  ]
})
