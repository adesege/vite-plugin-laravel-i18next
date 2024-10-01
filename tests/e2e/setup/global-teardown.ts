import fs from 'fs-extra';
import path from 'path';
import { test as teardown } from '@playwright/test';
import triggerViteBuild from './triggerViteBuild';

const outputPath = path.join(import.meta.dirname, 'app/src/locales');

teardown('remove locales folder', async () => {
  fs.removeSync(outputPath);

  await triggerViteBuild();
});
