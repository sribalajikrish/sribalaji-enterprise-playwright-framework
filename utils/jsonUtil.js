import fs from 'fs';

export function readJson(filePath) {

  if (!fs.existsSync(filePath)) {
    throw new Error(`JSON file not found: ${filePath}`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');

  return JSON.parse(fileContent);
}