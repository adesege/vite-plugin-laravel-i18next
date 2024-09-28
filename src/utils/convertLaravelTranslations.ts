import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as path from 'path';
import parseLaravelPhpArray from './parseLaravelPhpArray';
import flattenObject from './flattenObject';
import handleInterpolation from './handleInterpolation';
import handlePluralization from './handlePluralization';

async function convertLaravelTranslations(laravelLangPath: string, outputPath: string) {
  const languages = await fs.readdir(laravelLangPath);

  for (const lang of languages) {
    const langDir = path.join(laravelLangPath, lang);
    const stats = await fs.stat(langDir);

    if (stats.isDirectory()) {
      const translationFiles = glob.sync('**/*.php', { cwd: langDir });

      for (const file of translationFiles) {
        const filePath = path.join(langDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const data = parseLaravelPhpArray(content);

        let flattened = flattenObject(data);
        flattened = handlePluralization(flattened);
        flattened = handleInterpolation(flattened);

        const namespace = file.replace(/\.php$/, '');
        const outputDir = path.join(outputPath, lang);
        await fs.ensureDir(outputDir);
        const outputFile = path.join(outputDir, `${namespace}.json`);
        await fs.writeJson(outputFile, flattened, { spaces: 2 });
      }
    } else if (stats.isFile() && lang.endsWith('.json')) {
      // Handle JSON files (e.g., 'en.json')
      const jsonContent = await fs.readJson(langDir);
      const flattened = handleInterpolation(jsonContent);

      const langCode = path.basename(lang, '.json');
      const outputDir = path.join(outputPath, langCode);
      await fs.ensureDir(outputDir);
      const outputFile = path.join(outputDir, 'common.json');
      await fs.writeJson(outputFile, flattened, { spaces: 2 });
    }
  }
}

export default convertLaravelTranslations;
