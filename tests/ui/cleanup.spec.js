import { test, expect } from '@playwright/test';
import { registerSuiteHooks } from '../../hooks/suiteHooks.js';
import { DatabaseManager } from '../../resources/database/DatabaseManager.js';
import { ApiManager } from '../../resources/api/ApiManager.js';
import { MockManager } from '../../resources/mock/MockManager.js';
import { logger } from '../../logger/logger.js';

const database = new DatabaseManager();
const api = new ApiManager();
const mock = new MockManager();

registerSuiteHooks({

  beforeAllSetup: async () => {

    await database.connect();
    await api.initialize();
    await mock.start();

    logger.info('All resources initialized');

  },

  afterAllCleanup: async () => {

    try {
      await mock.stop();
    } catch (error) {
      logger.error('Mock cleanup failed', error);
    }

    try {
      await api.dispose();
    } catch (error) {
      logger.error('API cleanup failed', error);
    }

    try {
      await database.disconnect();
    } catch (error) {
      logger.error('Database cleanup failed', error);
    }

  },

});

test.describe('Framework Cleanup', () => {

  test('should initialize and cleanup framework resources', async () => {

    expect(database.connection).not.toBeNull();
    expect(api.client).not.toBeNull();
    expect(mock.isStarted).toBe(true);

    logger.info('Framework resource lifecycle validation completed');

  });

});