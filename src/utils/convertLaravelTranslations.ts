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
      await processLanguageDirectory(langDir, outputPath, lang);
    } else if (stats.isFile() && lang.endsWith('.json')) {
      await processJsonFile(path.dirname(langDir), lang, outputPath, 'en');
    }
  }
}

async function processLanguageDirectory(langDir: string, outputPath: string, lang: string) {
  await processPhpFiles(langDir, outputPath, lang);
  await processJsonFiles(langDir, outputPath, lang);
}

async function processPhpFiles(langDir: string, outputPath: string, lang: string) {
  const phpFiles = glob.sync('**/*.php', { cwd: langDir });
  for (const file of phpFiles) {
    await processPhpFile(langDir, file, outputPath, lang);
  }
}

async function processJsonFiles(langDir: string, outputPath: string, lang: string) {
  const jsonFiles = glob.sync('**/*.json', { cwd: langDir });
  for (const file of jsonFiles) {
    await processJsonFile(langDir, file, outputPath, lang);
  }
}

async function processPhpFile(langDir: string, file: string, outputPath: string, lang: string) {
  const filePath = path.join(langDir, file);
  const content = await fs.readFile(filePath, 'utf-8');
  const data = parseLaravelPhpArray(content);

  let flattened = flattenObject(data);
  flattened = handlePluralization(flattened, lang);
  flattened = handleInterpolation(flattened);

  await writeOutputFile(outputPath, lang, file.replace(/\.php$/, ''), flattened);
}

async function processJsonFile(langDir: string, file: string, outputPath: string, lang: string) {
  const filePath = path.join(langDir, file);
  const content = await fs.readJson(filePath);
  const flattened = handleInterpolation(content);

  await writeOutputFile(outputPath, lang, file.replace(/\.json$/, ''), flattened);
}

async function writeOutputFile(outputPath: string, lang: string, namespace: string, data: object) {
  const outputDir = path.join(outputPath, lang);
  await fs.ensureDir(outputDir);
  const outputFile = path.join(outputDir, `${namespace}.json`);
  await fs.writeJson(outputFile, data, { spaces: 2 });
}

export default convertLaravelTranslations;
