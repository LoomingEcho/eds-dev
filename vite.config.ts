import { defineConfig } from "vite";
import minifyHTML from "rollup-plugin-minify-html-literals";

const { resolve } = require("path");

const isProd = process.env.NODE_ENV === "production";

export default defineConfig(({ command, mode }) => {
  return {
    css: {
      devSourcemap: true,
    },
    build: {
      sourcemap: true,
      minify: true,
      cssMinify: true,
      commonjsOptions: {
        include: ["node_modules/**"],
      },
      emptyOutDir: true,
      rollupOptions: {
        cache: false,
        preserveEntrySignatures: "strict",
        input: {
          styles: resolve(__dirname, "src/styles/sass/main.scss"),
          main: resolve(__dirname, "src/main.ts"),
          counter: resolve(__dirname, "src/blocks/counter/counter.ts"),
        },
        output: {
          dir: "dist",
          assetFileNames: () => {
            return "[name]/[name][extname]";
          },
          chunkFileNames: "__chunks__/[name].[hash].js",
          entryFileNames: "[name]/[name].js",
        },
        plugins: [isProd && minifyHTML()],
      },
    },
  };
});
