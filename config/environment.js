import dotenv from 'dotenv';

dotenv.config();

const requiredVariables = [
  'QA_BASE_URL',
  'UAT_BASE_URL',
  'ADMIN_USERNAME',
  'ADMIN_PASSWORD',
];

for (const variable of requiredVariables) {
  if (!process.env[variable]) {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
}

export const environments = {

  qa: {
    baseURL: process.env.QA_BASE_URL,
  },

  uat: {
    baseURL: process.env.UAT_BASE_URL,
  },

};

export const credentials = {

  adminUsername: process.env.ADMIN_USERNAME,
  adminPassword: process.env.ADMIN_PASSWORD,

};