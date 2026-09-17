import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { credentials } from '../config/environment.js';

const authFile = '.auth/admin.json';

setup('authenticate admin', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto('/web/index.php/auth/login');

  await loginPage.login(
    credentials.adminUsername,
    credentials.adminPassword
  );

  await loginPage.waitForURL(/dashboard/);

  await page.context().storageState({
    path: authFile,
  });

});