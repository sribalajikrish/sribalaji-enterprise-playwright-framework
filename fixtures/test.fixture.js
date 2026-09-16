import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

export const test = base.extend({

  loginPage: async ({ page }, use) => {

    // Setup
    const loginPage = new LoginPage(page);

    // Test uses the fixture
    await use(loginPage);

    // Teardown
    console.log('LoginPage fixture teardown completed');
  },

});

export { expect } from '@playwright/test';