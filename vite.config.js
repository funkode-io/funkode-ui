import { defineConfig } from 'vite'
import VitePluginWebc  from 'vite-plugin-webc'

export default defineConfig({
  plugins: [
    VitePluginWebc ({
      // WebC plugin options here
      components: ['src/components/**/*.webc'],
      transformIncludeFilter: (id) => id.endsWith('.webc')
    })
  ]
})
