import { checkValidity } from '../../app/api/helpers/checkValidity';
import LoginPage from '../../app/pages/login-page';
import RegPage from '../../app/pages/registration-page';

describe('Check validity of form inputs', () => {
  it('should return false if one of error blocks on the page login is not empty', () => {
    document.body.innerHTML = '';
    const loginBlock = new LoginPage().drawLoginPage();
    document.body.append(loginBlock);
    const errorBlocks = document.querySelectorAll('.error-message');
    errorBlocks[1].innerHTML = 'Error!';
    const isValid = checkValidity();

    expect(isValid).toBeFalsy();
  });

  it('should return true if all error blocks on the page login are empty', () => {
    document.body.innerHTML = '';
    const loginBlock = new LoginPage().drawLoginPage();
    document.body.append(loginBlock);
    const isValid = checkValidity();

    expect(isValid).toBeTruthy();
  });

  it('should return false if one of error blocks on the page register is not empty', () => {
    document.body.innerHTML = '';
    const regBlock = new RegPage().drawRegPage();
    document.body.append(regBlock);
    const errorBlocks = document.querySelectorAll('.error-message');
    errorBlocks[1].innerHTML = 'Error!';
    const isValid = checkValidity();

    expect(isValid).toBeFalsy();
  });

  it('should return true if all error blocks on the page register are empty', () => {
    document.body.innerHTML = '';
    const regBlock = new RegPage().drawRegPage();
    document.body.append(regBlock);
    const isValid = checkValidity();

    expect(isValid).toBeTruthy();
  });
});
