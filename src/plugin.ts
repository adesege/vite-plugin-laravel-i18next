import { Plugin } from 'vite';
import convertLaravelTranslations from './utils/convertLaravelTranslations';

const laravelI18nextPlugin = (options: {
  laravelLangPath: string;
  outputPath: string;
}): Plugin => {
  return {
    name: 'vite-plugin-laravel-i18next',

    buildStart: async () => {
      await convertLaravelTranslations(options.laravelLangPath, options.outputPath);
    },

    handleHotUpdate: async ({ file, server }) => {
      if (file.endsWith('.php') || file.endsWith('.json')) {
        // A translation file has changed
        await convertLaravelTranslations(options.laravelLangPath, options.outputPath);
        // Invalidate modules that depend on the translations
        server.ws.send({
          type: 'full-reload',
        });
      }
    },
  };
};

export default laravelI18nextPlugin;
