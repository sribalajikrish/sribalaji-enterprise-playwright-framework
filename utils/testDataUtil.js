import { readJson } from './jsonUtil.js';
import { readExcel } from './excelUtil.js';

export function getTestData(fileType, filePath, sheetName) {

  if (!fileType) {
    throw new Error('Test data file type is required');
  }

  if (!filePath) {
    throw new Error('Test data file path is required');
  }

  let data;

  switch (fileType.toLowerCase()) {

    case 'json':
      data = readJson(filePath);
      break;

    case 'excel':

      if (!sheetName) {
        throw new Error('Sheet name is required for Excel test data');
      }

      data = readExcel(filePath, sheetName);
      break;

    default:
      throw new Error(`Unsupported test data type: ${fileType}`);
  }

  // Validate returned test data
  if (!Array.isArray(data)) {
    throw new Error('Test data must be an array');
  }

  if (data.length === 0) {
    throw new Error('Test data is empty');
  }

  return data;
}