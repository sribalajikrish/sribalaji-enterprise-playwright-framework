import { defineConfig, devices } from '@playwright/test';
import { environments } from './config/environment.js';

export default defineConfig({

  testDir: './tests',

  timeout: 30 * 1000,

  expect: {
    timeout: 5 * 1000,
  },

  fullyParallel: true,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
  },

  projects: [

    {
      name: 'qa-chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: environments.qa.baseURL,
      },
    },

    {
      name: 'uat-chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: environments.uat.baseURL,
      },
    },

    {
      name: 'qa-firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: environments.qa.baseURL,
      },
    },

    {
      name: 'uat-firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: environments.uat.baseURL,
      },
    },

  ],

});
