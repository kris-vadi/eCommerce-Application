import { createElement } from '../../app/components/utils';
import RegPage from '../../app/pages/registration-page';

describe('Class RegPage: drawRegPage function', () => {
  document.body.innerHTML = '';
  document.body.append(createElement('div', ['main']));
  const reg = new RegPage();
  document.body.append(reg.drawRegPage());

  const btns = document.querySelectorAll('.auth-btn');
  const labels = document.getElementsByTagName('label');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const date = document.getElementById('dateOfBirth');
  const postalCode = document.getElementById('billing-postalCode');

  it('should create registration header', () => {
    const header = document.querySelector('.auth-header');
    expect(header).not.toBeNull();
    expect(header?.innerHTML).not.toEqual('');
  });

  it('should create registration form with its elements', () => {
    expect(document.querySelector('.auth-form')).not.toBeNull();
    expect(document.querySelector('.address-block')).not.toBeNull();
    expect(email).not.toBeNull();
    expect(password).not.toBeNull();
    expect(date).not.toBeNull();
    expect(postalCode).not.toBeNull();
    expect(labels).toHaveLength(19);
    expect(btns).toHaveLength(3);
  });

  it('should add properties to elements', () => {
    expect(email).toHaveProperty('required', true);
    expect(email).toHaveProperty('type', 'email');
    expect(password).toHaveProperty('required', true);
    expect(password).toHaveProperty('type', 'password');
    expect(date).toHaveProperty('required', true);
    expect(date).toHaveProperty('type', 'date');
    expect(postalCode).toHaveProperty('required', true);
    expect(postalCode).toHaveProperty('type', 'number');
    expect(password?.classList).toContain('auth-input');
  });

  it('should add correct text to elements', () => {
    expect(btns[1].textContent).toEqual('Registration');
    expect(btns[2].textContent).toEqual('Sign up');
    expect(labels[1].textContent).toEqual('Password*');
    expect(labels[2].textContent).toEqual('Show password');
    expect(labels[13].textContent).toEqual('Country*');
    expect(labels[15].textContent).toEqual('Street*');
  });
});
