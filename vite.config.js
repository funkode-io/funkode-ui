import { resolve, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";
import { libInjectCss } from "vite-plugin-lib-inject-css";

import { glob } from "glob";

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/funkode-io/' : '/',
  plugins: [libInjectCss(), dts({ include: ["lib"] }), tailwindcss()],
  resolve: {
    alias: {
      "@/lib": resolve(__dirname, "./lib"),
      "@/ui": resolve(__dirname, "./lib/components/ui"),
      "@/public": resolve(__dirname, "./public"),
    },
  },
  build: {
    copyPublicDir: false,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["ethers"],
      input: Object.fromEntries(
        glob
          .sync("lib/**/*.{ts,tsx}", {
            ignore: ["lib/**/*.d.ts", "lib/**/*.stories.tsx"],
          })
          .map((file) => [
            relative("lib", file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name].[hash].js",
        preserveModules: false,
      },
    },
  },
});
