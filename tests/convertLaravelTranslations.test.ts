import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs-extra';
import * as path from 'path';
import convertLaravelTranslations from '../src/utils/convertLaravelTranslations';

const fixturesPath = path.join(__dirname, 'fixtures');
const outputPath = path.join(__dirname, 'output');

describe('convertLaravelTranslations', () => {
  beforeEach(() => {
    fs.emptyDirSync(outputPath);
  });

  afterEach(() => {
    fs.removeSync(outputPath);
  });

  it('should convert basic translations including nested structures', async () => {
    await convertLaravelTranslations(
      path.join(fixturesPath, 'basic'),
      outputPath
    );

    const messagesResult = await fs.readJson(path.join(outputPath, 'en', 'messages.json'));
    expect(messagesResult).toEqual({
      welcome: 'Welcome to our application',
      goodbye: 'Goodbye!'
    });

    const dashboardResult = await fs.readJson(path.join(outputPath, 'en', 'dashboard.json'));
    expect(dashboardResult).toEqual({
      'title': 'Dashboard',
      'users.title': 'Users',
      'users.list': 'User List'
    });
  });

  it('should handle pluralization rules', async () => {
    await convertLaravelTranslations(
      path.join(fixturesPath, 'pluralization'),
      outputPath
    );

    const result = await fs.readJson(path.join(outputPath, 'en', 'messages.json'));
    expect(result).toEqual({
      apples: {
        '0': 'No apples',
        'one': 'One apple',
        'other': 'There are many apples'
      },
      bananas: {
        '0': 'There are no bananas',
        'one': 'There is one banana',
        'other': 'There are many bananas'
      },
      cars: {
        '0': 'No cars',
        '1': 'Few cars',
        '2': 'Few cars',
        '3': 'Few cars',
        '4': 'Few cars',
        '5': 'Five cars',
        'other': 'Many cars'
      },
      fruits: {
        '0': 'No fruits',
        'one': 'One fruit',
        '2': 'A couple of fruits',
        '3': 'Many fruits'
      },
      animals: {
        'one': 'One animal',
        'other': 'Multiple animals'
      }
    });
  });

  it('should handle interpolation and encapsed strings', async () => {
    await convertLaravelTranslations(
      path.join(fixturesPath, 'interpolation'),
      outputPath
    );

    const result = await fs.readJson(path.join(outputPath, 'en', 'messages.json'));
    expect(result).toEqual({
      greeting: 'Hello, {{name}}!',
      balance: 'Your balance is {{amount}}',
      simple_encapsed: 'Hello, {{name}}!',
      complex_encapsed: 'Your balance is {{amount}} as of {{date}}.',
      mixed_encapsed: 'Welcome, {{user.name}}! You have {{user.messages}} new messages.',
      user_greeting: 'Welcome, {{user.name}}!',
      user_stats: 'You have {{user.messages}} new messages and {{user.notifications}} notifications.',
      nested_access: 'Your first item is {{cart.items.0}} and your last item is {{cart.items.last}}.'
    });
  });

  it('should process JSON files', async () => {
    await convertLaravelTranslations(
      path.join(fixturesPath, 'json'),
      outputPath
    );

    const result = await fs.readJson(path.join(outputPath, 'en', 'common.json'));
    expect(result).toEqual({
      'Welcome to our application': 'Welcome to our application',
      'Goodbye!': 'Goodbye!'
    });
  });

  it('should handle multiple languages', async () => {
    await convertLaravelTranslations(
      path.join(fixturesPath, 'multi-lang'),
      outputPath
    );

    const enResult = await fs.readJson(path.join(outputPath, 'en', 'messages.json'));
    expect(enResult).toEqual({
      welcome: 'Welcome',
      goodbye: 'Goodbye'
    });

    const esResult = await fs.readJson(path.join(outputPath, 'es', 'messages.json'));
    expect(esResult).toEqual({
      welcome: 'Bienvenido',
      goodbye: 'Adiós'
    });
  });

  it('should handle edge cases: empty and malformed files', async () => {
    await convertLaravelTranslations(
      path.join(fixturesPath, 'edge-cases'),
      outputPath
    );

    const emptyResult = await fs.readJson(path.join(outputPath, 'en', 'empty.json'));
    expect(emptyResult).toEqual({});

    const malformedResult = await fs.readJson(path.join(outputPath, 'en', 'malformed.json'));
    expect(malformedResult).toEqual({});
  });

  it('should throw an error for invalid PHP syntax', async () => {
    await expect(convertLaravelTranslations(
      path.join(fixturesPath, 'invalid'),
      outputPath
    )).rejects.toThrow();
  });

  it('should handle various PHP value types including unsupported ones', async () => {
    await convertLaravelTranslations(
      path.join(fixturesPath, 'value-types'),
      outputPath
    );

    const result = await fs.readJson(path.join(outputPath, 'en', 'messages.json'));
    expect(result).toEqual({
      'string_value': 'This is a string',
      'number_value': 42,
      'boolean_value_true': true,
      'boolean_value_false': false,
      'null_value': null,
      'array_value.0': 'item1',
      'array_value.1': 'item2',
      'nested_array.key1': 'value1',
      'nested_array.key2': 'value2',
      'supported_value': 'This is supported',
      'unsupported_value': null
    });
  });

  it('should handle complex nested structures', async () => {
    await convertLaravelTranslations(
      path.join(fixturesPath, 'complex-nested'),
      outputPath
    );

    const result = await fs.readJson(path.join(outputPath, 'en', 'messages.json'));
    expect(result).toEqual({
      'level1.level2.level3': 'Deeply nested value',
      'level1.array.0': 'First item',
      'level1.array.1': 'Second item',
      'level1.mixed': 'Mixed value'
    });
  });

  it('should handle unsupported key types in PHP arrays', async () => {
    await convertLaravelTranslations(
      path.join(fixturesPath, 'unsupported-keys'),
      outputPath
    );

    const result = await fs.readJson(path.join(outputPath, 'en', 'messages.json'));
    expect(result).toEqual({
      'supported_key': 'Supported value'
    });
  });
});
