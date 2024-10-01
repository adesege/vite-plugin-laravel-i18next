import fs from 'fs-extra';
import path from 'path';
import { test as setup } from '@playwright/test';
import triggerViteBuild from './triggerViteBuild';

const outputPath = path.join(import.meta.dirname, 'app/src/locales');

setup('empty locales folder', async () => {
  // Empty the locales folder
  fs.emptyDirSync(outputPath);

  // Run Vite build to trigger the plugin
  await triggerViteBuild();
});
