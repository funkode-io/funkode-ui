import { resolve, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";

import { glob } from "glob";

export default defineConfig({
  plugins: [dts({ include: ["lib"] }), tailwindcss()],
  resolve: {
    alias: {
      "@lib/": fileURLToPath(new URL("./lib", import.meta.url)),
      "@ui/": fileURLToPath(new URL("./lib/components/ui", import.meta.url)),
      "@components/": fileURLToPath(
        new URL("./lib/components", import.meta.url),
      ),
    }
  },
  build: {
    copyPublicDir: false,
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
      },
    },
  },
});
