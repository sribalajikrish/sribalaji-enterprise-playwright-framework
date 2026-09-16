export class MockManager {

  constructor(config = {}) {
    this.config = config;
    this.isStarted = false;
  }

  async start() {
    console.log('[MOCK] Starting mock service...');

    // TODO: Start actual mock service
    this.isStarted = true;
  }

  async mockResponse(endpoint, response) {
    if (!this.isStarted) {
      throw new Error('Mock service is not started');
    }

    // TODO: Configure mock response
    console.log(`[MOCK] Mocking response for ${endpoint}`);
  }

  async stop() {
    console.log('[MOCK] Stopping mock service...');

    // TODO: Stop actual mock service
    this.isStarted = false;
  }

}