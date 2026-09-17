import { test, expect } from '@playwright/test';

test.describe('Test Isolation', () => {

  test('should create isolated browser context', async ({ page }) => {

    await page.goto('/web/index.php/auth/login');

    await page.evaluate(() => {
      localStorage.setItem('testIsolation', 'test-one');
    });

    const value = await page.evaluate(() => {
      return localStorage.getItem('testIsolation');
    });

    expect(value).toBe('test-one');

  });

  test('should not share browser storage with another test', async ({ page }) => {

    await page.goto('/web/index.php/auth/login');

    const value = await page.evaluate(() => {
      return localStorage.getItem('testIsolation');
    });

    expect(value).toBeNull();

  });

});