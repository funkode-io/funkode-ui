import { extname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({ include: ['src/lib'] })
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/lib/main.ts'),
      formats: ['es']
    }
  },
  rollupOptions: {
    enforce: 'pre',
    // make sure to externalize deps that shouldn't be bundled
    // into your library
    external: ['vue', 'drab'],
    input: Object.fromEntries(
      glob.sync('src/lib/**/*.{ts,tsx}', {
        ignore: ["src/lib/**/*.d.ts"],
      }).map(file => [
        // The name of the entry point
        // lib/nested/foo.ts becomes nested/foo
        relative(
          'src/lib',
          file.slice(0, file.length - extname(file).length)
        ),
        // The absolute path to the entry file
        // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
        fileURLToPath(new URL(file, import.meta.url))
      ])
    ),
    output: {
      assetFileNames: 'assets/[name][extname]',
      entryFileNames: '[name].js',
    }
  },
})
