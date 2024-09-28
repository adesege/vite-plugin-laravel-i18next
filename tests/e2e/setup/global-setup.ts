import * as fs from 'fs-extra';
import * as path from 'path';
import { test as setup } from '@playwright/test';
import triggerViteBuild from './triggerViteBuild';

const outputPath = path.join(__dirname, 'app/src/locales');

setup('empty locales folder', async () => {
  // Empty the locales folder
  fs.emptyDirSync(outputPath);

  // Run Vite build to trigger the plugin
  await triggerViteBuild();
});
