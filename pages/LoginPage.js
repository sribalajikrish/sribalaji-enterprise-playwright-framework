import { BasePage } from '../base/BasePage.js';
import { clickElement, fillElement } from '../helpers/elementHelper.js';
import { logger } from '../logger/logger.js';
import { isEmpty } from '../utils/stringUtil.js';

export class LoginPage extends BasePage {

  constructor(page) {
    super(page);

    this.username = page.getByPlaceholder('Username');
    this.password = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async login(username, password) {

  if (isEmpty(username) || isEmpty(password)) {
    logger.error('Username or password is empty');
    throw new Error('Login credentials cannot be empty');
  }

  try {

    logger.info('Starting login');

    await fillElement(this.username, username);
    await fillElement(this.password, password);
    await clickElement(this.loginButton);

    logger.info('Login completed');

  } catch (error) {

    logger.error('Login failed', error);
    throw error;

  }
}

  async isInvalidCredentialsMessageVisible() {
    const message = this.page.getByText('Invalid credentials');

    await message.waitFor({ state: 'visible' });

    return true;
  }

}