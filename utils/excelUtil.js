import XLSX from 'xlsx';

export function readExcel(filePath, sheetName) {

  const workbook = XLSX.readFile(filePath);

  const worksheet = workbook.Sheets[sheetName];

  if (!worksheet) {
    throw new Error(`Sheet not found: ${sheetName}`);
  }

  return XLSX.utils.sheet_to_json(worksheet);
}