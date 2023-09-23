import { createElement, createInputElement, createCheckBoxElement } from './utils';

abstract class AuthPage {
  public drawAuthPage(
    mode: string,
    submitText: string,
    footerText: string,
    drawForm: (block: HTMLFormElement) => void,
  ): HTMLDivElement {
    const authPage = createElement('div', ['auth-page', 'main__wrapper']) as HTMLDivElement;
    const authBlock = createElement('div', ['auth-block', `${mode}-block`]) as HTMLDivElement;
    const authHeader = createElement('div', ['auth-header']) as HTMLDivElement;
    const authBtnAuth = createElement(
      'button',
      ['button', 'button_white', 'auth-btn'],
      'Autorization',
    ) as HTMLButtonElement;
    authBtnAuth.setAttribute('id', 'form-auth-btn');
    const authBtnReg = createElement(
      'button',
      ['button', 'button_white', 'auth-btn'],
      'Registration',
    ) as HTMLButtonElement;
    authBtnReg.setAttribute('id', 'form-reg-btn');
    const authForm = createElement('form', [
      'auth-form',
      `${mode === 'login' ? 'login-form' : 'register-form'}`,
    ]) as HTMLFormElement;

    authPage.append(authBlock);
    drawForm(authForm);

    const apiStatus = createElement('p', ['api-status'], '');
    const submitBtn = createElement(
      'button',
      ['button', 'button_green', 'auth-btn', `${mode === 'login' ? 'submit-login' : 'submit-register'}`],
      submitText,
    );
    authForm.append(apiStatus, submitBtn);

    const authFooter = createElement('div', ['auth-footer'], footerText);

    authHeader.append(authBtnAuth, authBtnReg);
    authBlock.append(authHeader, authForm, authFooter);

    return authPage;
  }

  protected addEmail = (title: string = 'E-mail*', id: string = 'email'): HTMLDivElement => {
    return createInputElement('email', title, id, 'auth', true, {
      name: 'username',
      autocomplete: 'username',
    });
  };

  protected addPassword = (
    typeOfPassword: string,
    id: string = 'password',
    label: string = 'Password*',
  ): HTMLDivElement => {
    const passwordBlock = createInputElement('password', label, id, 'auth', true, {
      name: 'password',
      autocomplete: typeOfPassword,
    });
    const boxShowPassword = createCheckBoxElement('Show password', `showPassword-${id}`);
    passwordBlock.append(boxShowPassword);
    return passwordBlock;
  };
}

export default AuthPage;
