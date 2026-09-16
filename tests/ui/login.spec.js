import { registerSuiteHooks } from '../../hooks/suiteHooks.js';
import { test, expect } from '../../fixtures/test.fixture.js';
import { isEmpty } from '../../utils/stringUtil.js';
import { logger } from '../../logger/logger.js';
import { getTestData } from '../../utils/testDataUtil.js';
import path from 'path';
import { paths } from '../../config/paths.js';

const loginJsonPath = path.join(
  paths.testData,
  'loginData.json'
);

const loginData = getTestData(
  'json',
  loginJsonPath
);

registerSuiteHooks();

test.describe('Login', () => {

  loginData.forEach((data) => {

    test(
      `Login - ${
        data.expectedResult === 'success'
          ? 'valid credentials'
          : 'invalid credentials'
      }`,
      {
        tag: ['@smoke', '@integration'],
      },
      async ({ loginPage }) => {

        const username = data.username;
        const password = data.password;

        logger.info(
          `Testing login - Expected result: ${data.expectedResult}`
        );

        expect(isEmpty(username)).toBe(false);
        expect(isEmpty(password)).toBe(false);

        await loginPage.goto('/web/index.php/auth/login');

        await loginPage.login(username, password);

        if (data.expectedResult === 'success') {

          await loginPage.waitForURL(/dashboard/);

          await expect(
            await loginPage.getCurrentUrl()
          ).toMatch(/dashboard/);

        } else {

          await expect(
            loginPage.isInvalidCredentialsMessageVisible()
          ).resolves.toBe(true);

        }

        logger.info(
          `Login test completed - ${data.expectedResult}`
        );

      }
    );

  });

});