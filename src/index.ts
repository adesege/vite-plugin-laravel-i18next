import chokidar, { FSWatcher } from "chokidar";
import * as path from "path";
import { normalizePath, Plugin, ViteDevServer } from "vite";
import convertLaravelTranslations from "./utils/convertLaravelTranslations";

const laravelI18nextPlugin = (options: {
  laravelLangPath: string;
  outputPath: string;
}): Plugin => {
  let watcher: FSWatcher | null = null;

  return {
    name: "vite-plugin-laravel-i18next",

    async buildStart() {
      await convertLaravelTranslations(
        options.laravelLangPath,
        options.outputPath
      );
    },

    configureServer(server) {
      const normalizedLaravelLangPath = normalizePath(
        path.resolve(options.laravelLangPath)
      );

      watcher = chokidar.watch(normalizedLaravelLangPath, {
        ignoreInitial: true,
        awaitWriteFinish: {
          stabilityThreshold: 100,
          pollInterval: 100,
        },
      });

      watcher.on("add", async (file) => {
        await handleTranslationFileChange(file, server);
      });

      watcher.on("change", async (file) => {
        await handleTranslationFileChange(file, server);
      });
    },

    handleHotUpdate(ctx) {
      const { file, server, modules } = ctx;

      const isTranslationFile =
        isFileInLangPath(file) &&
        (file.endsWith(".php") || file.endsWith(".json"));

      if (isTranslationFile) {
        handleTranslationFileChange(file, server);
        // In Vite 6, it's recommended to return void for async operations
        // that don't immediately affect modules
        return [];
      }

      // For non-translation files, return the original modules to preserve normal HMR
      return modules;
    },

    closeBundle() {
      if (watcher) {
        watcher.close();
      }
    },
  };

  function isFileInLangPath(file: string): boolean {
    const relativePath = path.relative(options.laravelLangPath, file);
    return !relativePath.startsWith("..");
  }

  async function handleTranslationFileChange(
    file: string,
    server: ViteDevServer
  ) {
    const isTranslationFile =
      isFileInLangPath(file) &&
      (file.endsWith(".php") || file.endsWith(".json"));

    if (isTranslationFile) {
      await convertLaravelTranslations(
        options.laravelLangPath,
        options.outputPath
      );

      const modules = server.moduleGraph.getModulesByFile(file);
      if (modules && modules.size > 0) {
        return Array.from(modules);
      }
    }
    return [];
  }
};

export default laravelI18nextPlugin;
