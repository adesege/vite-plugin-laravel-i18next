import { builtinModules } from "module";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: ["package.json", "README.md", "LICENSE", "CHANGELOG.md"].map(
        (item) => ({
          src: item,
          dest: "./",
        })
      ),
    }),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      // Ensure compatibility with Vite 6
      staticImport: true,
    }),
  ],
  build: {
    lib: {
      formats: ["es"],
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "vite-plugin-laravel-i18next",
      fileName: "index",
    },
    rollupOptions: {
      external: [
        ...builtinModules,
        "vite",
        "chokidar",
        "path",
        "fs",
        "glob",
        "php-parser",
      ],
    },
    // Update target for better compatibility with modern browsers
    target: "es2020",
    sourcemap: true,
  },
});
