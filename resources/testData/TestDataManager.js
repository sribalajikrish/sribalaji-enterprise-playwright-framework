import { getTestData } from '../../utils/testDataUtil.js';

export class TestDataManager {

  constructor() {
    this.data = null;
  }

  load(fileType, filePath, sheetName) {

    this.data = getTestData(
      fileType,
      filePath,
      sheetName
    );

    return this.data;
  }

  getData() {

    if (!this.data) {
      throw new Error('Test data has not been loaded');
    }

    return this.data;
  }

  clear() {
    this.data = null;
  }

}