import { countries, salutation } from './constants';
import {
  createElement,
  createInputElement,
  createSelectElement,
  createCheckBoxElement,
} from './utils';

class LoginPage {
  private mode = 'Autorization';

  public drawLoginPage(): void {
    const loginBlockType = this.mode === 'Autorization' ? 'auth-block' : 'reg-block';
    const loginPage = createElement('div', ['login-page']);
    const loginBlock = createElement('div', ['login-block', loginBlockType]);
    const loginHeader = createElement('div', ['login-header']);
    const loginBtnAuth = createElement('button', ['button', 'login-btn'], 'Autorization');
    const loginBtnReg = createElement('button', ['button', 'login-btn'], 'Registration');
    const loginForm = createElement('form', ['login-form']);

    const authFooter = `<p>I am not registered. <a href=''>Go to Registration.</a></p> 
    <p>I forgot password. <a href=''>Reset</a></p>`;
    const regFooter = `<p>I am registered. <a href="">Go to Login.</a></p>
    <p>I forgot password. <a href="">Reset</a></p>`;

    const parent = document.querySelector('.main');
    if (parent) {
      parent.innerHTML = '';
      parent.append(loginPage);
    }
    loginPage.append(loginBlock);
    loginBlock.innerHTML = '';
    loginForm.innerHTML = '';

    if (this.mode === 'Autorization') {
      this.drawAuthBlock(loginForm);
    } else {
      this.drawRegBlock(loginForm);
    }

    const submitBlock = createElement('div', ['login-submit-block']);
    const submitText = this.mode === 'Autorization' ? 'Enter' : 'Register';
    const submitBtn = createElement('button', ['button', 'button_white', 'login-btn'], submitText);
    submitBlock.append(submitBtn);

    const footerText = this.mode === 'Autorization' ? authFooter : regFooter;
    const loginFooter = createElement('div', ['login-footer'], footerText);

    loginHeader.append(loginBtnAuth, loginBtnReg);
    loginBlock.append(loginHeader, loginForm, submitBlock, loginFooter);

    loginBtnAuth.addEventListener('click', () => {
      this.mode = 'Autorization';
      this.drawLoginPage();
    });

    loginBtnReg.addEventListener('click', () => {
      this.mode = 'Registration';
      this.drawLoginPage();
    });
  }

  private drawAuthBlock(parent: HTMLElement): void {
    parent.append(createInputElement('email', 'E-mail', 'email', 'login'));
    parent.append(createInputElement('password', 'Password', 'password', 'login'));
  }

  private drawRegBlock(parent: HTMLElement): void {
    const emailBlock = createElement('div', ['login-row']);
    emailBlock.append(createInputElement('email', 'E-mail*', 'email', 'login'));
    emailBlock.append(createInputElement('password', 'Password*', 'password', 'login'));
    parent.append(emailBlock);

    const nameBlock = createElement('div', ['login-row']);
    nameBlock.append(createInputElement('text', 'First name*', 'firstName', 'login'));
    nameBlock.append(createInputElement('text', 'Last name*', 'lastName', 'login'));
    parent.append(nameBlock);

    const userInfo = createElement('div', ['login-row']);
    userInfo.append(createInputElement('date', 'Date of birth*', 'dateOfBirth', 'login'));
    userInfo.append(createSelectElement(salutation, 'Salutation', 'salutation', 'login', false));
    parent.append(userInfo);

    parent.append(
      createCheckBoxElement('Billing and shipping addresses are the same', 'are-same-addresses'),
    );

    const addressTypes = ['billing', 'shipping'];
    addressTypes.forEach((type) => {
      const addressBlock = createElement('div', ['login-row', 'address-block']);
      const addressTitle = createElement('p', ['address-title'], `Input your ${type} address`);

      const userAddress = createElement('div', ['login-row']);
      userAddress.append(createSelectElement(countries, 'Country*', 'country', 'login'));
      userAddress.append(createInputElement('text', 'City*', 'city', 'login'));
      userAddress.append(createInputElement('text', 'Street*', 'street', 'login'));
      userAddress.append(
        createInputElement('number', 'Postal code*', 'code', 'login', true, {
          min: 10000,
          max: 999999,
        }),
      );

      const asDefault = createCheckBoxElement('Set as default address', `as-default-${type}`);

      addressBlock.append(addressTitle, userAddress, asDefault);
      parent.append(addressBlock);
    });

    const policyAgreeText =
      'I agree with <a href="">The terms of personal data processing</a> and <a href=""> Privacy policy</a>';
    parent.append(createCheckBoxElement(policyAgreeText, 'policyInput', true));
  }
}

export default LoginPage;
