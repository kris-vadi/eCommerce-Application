import { createElement } from '../../app/components/utils';
import LoginPage from '../../app/pages/login-page';

describe('Class LoginPage: drawLoginPage function', () => {
  document.body.innerHTML = '';
  document.body.append(createElement('div', ['main']));
  const login = new LoginPage();
  document.body.append(login.drawLoginPage());

  const btns = document.querySelectorAll('.auth-btn');
  const labels = document.getElementsByTagName('label');
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  it('should create login header and footer', () => {
    const header = document.querySelector('.auth-header');
    const footer = document.querySelector('.auth-footer');
    expect(header).not.toBeNull();
    expect(footer).not.toBeNull();
    expect(header?.innerHTML).not.toEqual('');
    expect(footer?.textContent).not.toBe('');
  });

  it('should create login form with its elements', () => {
    expect(document.querySelector('.auth-form')).not.toBeNull();
    expect(email).not.toBeNull();
    expect(password).not.toBeNull();
    expect(labels).toHaveLength(3);
    expect(btns).toHaveLength(3);
  });

  it('should add properties to elements', () => {
    expect(email).toHaveProperty('required', true);
    expect(email).toHaveProperty('type', 'email');
    expect(password).toHaveProperty('required', true);
    expect(password).toHaveProperty('type', 'password');
    expect(password?.classList).toContain('auth-input');
  });

  it('should add correct text to elements', () => {
    expect(btns[0].textContent).toEqual('Autorization');
    expect(btns[2].textContent).toEqual('Login');
    expect(labels[1].textContent).toEqual('Password*');
    expect(labels[2].textContent).toEqual('Show password');
  });
});
