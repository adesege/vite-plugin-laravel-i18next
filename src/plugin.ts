import { Plugin, ViteDevServer } from 'vite';
import convertLaravelTranslations from './utils/convertLaravelTranslations';
import * as path from 'path';
import { normalizePath } from 'vite';
import chokidar, { FSWatcher } from 'chokidar';

const laravelI18nextPlugin = (options: {
  laravelLangPath: string;
  outputPath: string;
}): Plugin => {
  let watcher: FSWatcher | null = null;

  return {
    name: 'vite-plugin-laravel-i18next',

    buildStart: async () => {
      await convertLaravelTranslations(options.laravelLangPath, options.outputPath);
    },

    configureServer(server) {
      const normalizedLaravelLangPath = normalizePath(path.resolve(options.laravelLangPath));

      watcher = chokidar.watch(normalizedLaravelLangPath, {
        ignoreInitial: true,
        awaitWriteFinish: {
          stabilityThreshold: 100,
          pollInterval: 100
        }
      });

      watcher.on('add', async (file) => {
        await handleFileChange(file, server);
      });

      watcher.on('change', async (file) => {
        await handleFileChange(file, server);
      });
    },

    handleHotUpdate: async ({ file, server }) => {
      return handleFileChange(file, server);
    },

    closeBundle() {
      if (watcher) {
        watcher.close();
      }
    }
  };

  async function handleFileChange(file: string, server: ViteDevServer) {
    const relativePath = path.relative(options.laravelLangPath, file);
    const isTranslationFile = !relativePath.startsWith('..') &&
      (file.endsWith('.php') || file.endsWith('.json'));

    if (isTranslationFile) {
      await convertLaravelTranslations(options.laravelLangPath, options.outputPath);

      const module = server.moduleGraph.getModulesByFile(file);

      if (module) {
        return Array.from(module);
      }
    }
    return [];
  }
};

export default laravelI18nextPlugin;
