import { by, element } from 'protractor';

export class LoginPage {

  async userNameInput(name: string) {
    await element(by.id('username')).sendKeys(name);
  }

  async passwordInput(password: string) {
    await element(by.id('password')).sendKeys(password);
  }

  async buttonLogin() {
    await element(by.id('buttonLogin')).click();
  }

}
