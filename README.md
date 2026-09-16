# Enterprise Playwright Framework

This project is a Playwright-based test automation framework for validating login and authentication flows in a web application. It follows a modular structure with page objects, fixtures, utilities, and environment-based configuration.

## Overview

The framework is designed to:

- automate browser-based UI tests using Playwright
- separate test logic from page interactions using the Page Object Model
- reuse a custom test fixture for page object setup
- load environment configuration from `.env`
- use external JSON test data for multiple scenarios
- generate HTML reports automatically

## Tech Stack

- Playwright Test
- JavaScript (ES modules)
- dotenv
- HTML reporting from Playwright

## Project Structure

```text
enterprise-playwright/
├── base/
│   └── BasePage.js
├── config/
│   ├── environment.js
│   └── paths.js
├── fixtures/
│   └── test.fixture.js
├── helpers/
│   ├── dropdownHelper.js
│   ├── elementHelper.js
│   └── waitHelper.js
├── logger/
│   └── logger.js
├── pages/
│   └── LoginPage.js
├── test-data/
│   └── loginData.json
├── tests/
│   ├── integration.spec.js
│   └── integration_original.spec.js
├── utils/
│   ├── dateUtil.js
│   ├── excelUtil.js
│   ├── jsonUtil.js
│   ├── stringUtil.js
│   └── testDataUtil.js
├── .env
├── .gitignore
├── package.json
├── playwright.config.js
├── playwright-report/
├── test-results/
└── README.md
```

## Prerequisites

Before running the tests, make sure you have:

- Node.js (LTS recommended)
- npm

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Configure environment variables by creating a `.env` file in the project root:

```env
BASE_URL=https://opensource-demo.orangehrmlive.com
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=admin123
```

## Configuration

The main Playwright config is in `playwright.config.js` and includes the following settings:

- `testDir: './tests'`
- `timeout: 30 * 1000`
- `reporter: 'html'`
- `baseURL` loaded from environment variables
- `trace: 'on-first-retry'`
- `screenshot: 'only-on-failure'`
- `video: 'retain-on-failure'`
- `headless: false`

## Fixtures

A custom fixture is defined in `fixtures/test.fixture.js`. It extends Playwright’s base test and provides a shared `loginPage` object for all tests.

Example:

```js
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});
```

This keeps test cases cleaner and reusable.

## Page Object Model

### BasePage

`base/BasePage.js` contains shared browser actions such as:

- `goto(url)`
- `getTitle()`
- `getCurrentUrl()`
- `goBack()`
- `reload()`
- `waitForURL(url)`

### LoginPage

`pages/LoginPage.js` contains the login page selectors and actions:

- username input
- password input
- login button
- validation check for invalid credentials

Example usage:

```js
await loginPage.login(username, password);
```

## Test Data

The framework uses test data from `test-data/loginData.json`.

Example:

```json
[
  {
    "username": "Admin",
    "password": "admin123",
    "expectedResult": "success"
  },
  {
    "username": "Admin",
    "password": "wrongpassword",
    "expectedResult": "failure"
  }
]
```

The helper `utils/testDataUtil.js` reads the test data based on the specified type and path.

## Running Tests

Run the full test suite:

```bash
npx playwright test
```

Run a specific file:

```bash
npx playwright test tests/integration.spec.js
```

Run tests with UI mode:

```bash
npx playwright test --ui
```

Open the HTML report:

```bash
npx playwright show-report
```

## Example Test Flow

The login test in `tests/integration.spec.js` performs the following:

1. Loads environment values
2. Reads login test data
3. Opens the login page
4. Enters the credentials
5. Submits the form
6. Validates the expected success or failure result

## Logging

The project includes a simple logger in `logger/logger.js` to output:

- info messages
- warnings
- errors
- debug logs

## Notes

- The project uses ES modules (`"type": "module"` in `package.json`)
- The current framework focuses on login validation
- Playwright HTML reports are generated under the `playwright-report` folder

## Future Enhancements

Possible improvements for this framework include:

- more page objects for other modules
- reusable helpers for dropdowns and waits
- multiple environment configuration files
- CI pipeline integration
- more advanced reporting and analytics

## License

This project is licensed under the ISC license as defined in the package configuration.
