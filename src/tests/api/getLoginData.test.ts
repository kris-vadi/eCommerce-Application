import { getLoginData } from '../../app/api/helpers/getDataFromInput';
import LoginPage from '../../app/pages/login-page';

describe('Check receiving of data from login form', () => {
  it('should return correct data from login form', () => {
    document.body.innerHTML = '';
    const loginBlock = new LoginPage().drawLoginPage();
    document.body.append(loginBlock);

    const form = document.querySelector('.login-form') as HTMLFormElement;
    const email = document.querySelector('#email') as HTMLInputElement;
    const password = document.querySelector('#password') as HTMLInputElement;

    email.value = 'RandomGirl@example.com';
    password.value = 'Password!2';

    const data = getLoginData(form);

    expect(data).toEqual({ username: 'RandomGirl@example.com', password: 'Password!2' });
  });
});
