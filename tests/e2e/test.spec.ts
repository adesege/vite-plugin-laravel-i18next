import { test, expect } from '@playwright/test';

test.describe('Laravel i18next Plugin E2E Tests', () => {
  test('renders basic translations', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Welcome to our application')).toBeVisible();
    await expect(page.getByText('This is a sample application using Laravel translations with i18next.')).toBeVisible();
  });

  test('handles nested translations', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByText('Users')).toBeVisible();
    await expect(page.getByText('User List')).toBeVisible();
  });

  test('supports pluralization', async ({ page }) => {
    await page.goto('/fruits');

    await expect(page.getByRole('heading', { name: 'Fruits' })).toBeVisible();
    await expect(page.getByText('No apples')).toBeVisible();
    await expect(page.getByText('One apple')).toBeVisible();
    await expect(page.getByText('Many apples')).toHaveCount(2);
  });

  test('handles interpolation', async ({ page }) => {
    await page.goto('/greeting');

    await expect(page.getByText('Hello, John!')).toBeVisible();
    await expect(page.getByText('Your balance is $100')).toBeVisible();
  });

  test('supports multiple languages', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Welcome to our application')).toBeVisible();

    await page.selectOption('select[name="language"]', 'es');
    await expect(page.getByText('Bienvenido a nuestra aplicación')).toBeVisible();
  });

  test('processes JSON files', async ({ page }) => {
    await page.goto('/json-translations');

    await expect(page.getByText('Welcome to our application')).toBeVisible();
    await expect(page.getByText('Goodbye!')).toBeVisible();
  });

  test('handles complex nested structures', async ({ page }) => {
    await page.goto('/complex');

    await expect(page.getByText('Complex Translations')).toBeVisible();
    await expect(page.getByText('Deeply nested value')).toBeVisible();
    await expect(page.getByText('First item')).toBeVisible();
    await expect(page.getByText('Second item')).toBeVisible();
    await expect(page.getByText('Mixed value 3')).toBeVisible();
  });
});
