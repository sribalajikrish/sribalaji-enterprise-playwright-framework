import { test } from '@playwright/test';
import { logger } from '../logger/logger.js';

export function registerSuiteHooks({
  beforeAllSetup,
  afterAllCleanup,
} = {}) {

  test.beforeAll(async () => {

    logger.info('Suite setup started');

    if (beforeAllSetup) {
      await beforeAllSetup();
    }

    logger.info('Suite setup completed');
  });

  test.afterAll(async () => {

    logger.info('Suite cleanup started');

    if (afterAllCleanup) {
      await afterAllCleanup();
    }

    logger.info('Suite cleanup completed');
  });

}