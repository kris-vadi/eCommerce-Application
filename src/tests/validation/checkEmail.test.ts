import { createInputElement } from '../../app/components/utils';
import { checkEmail } from '../../app/components/validation';

describe('checkEmail function', () => {
  document.body.innerHTML = '';
  const emailBlock1 = createInputElement('email', 'Your first email', 'user-email-1', 'login');
  const emailBlock2 = createInputElement('email', 'Your second email', 'user-email-2', 'login');
  document.body.append(emailBlock1, emailBlock2);

  const inputElem1 = document.getElementById('user-email-1') as HTMLInputElement;
  inputElem1.value = 'example';
  const inputElem2 = document.getElementById('user-email-2') as HTMLInputElement;
  inputElem2.value = '.example@example.com';

  const warning1 = checkEmail(inputElem1.value);
  const warning2 = checkEmail(inputElem2.value);

  it('should compare text with templates', () => {
    expect(inputElem1.value).toMatch(/.{6,}/);
    expect(inputElem1.value).not.toMatch(/@/);
    expect(inputElem2.value).toMatch(/@/);
  });

  it('should add warnings to output', () => {
    expect(warning1).toBeTruthy();
    expect(warning2).toBeTruthy();
    expect(warning1).not.toMatch('Email address must be at least 6 characters long.');
    expect(warning1).toMatch('<p>Email address must contain an "@" symbol separating local part and domain name.</p>');
  });

  it('should return warning', () => {
    expect(warning1).toEqual(
      '<p>Email address must be properly formatted (e.g., user@example.com).</p><p>Email address must contain an "@" symbol separating local part and domain name.</p><p>Email address must contain a domain name (e.g., example.com).</p>',
    );
    expect(warning2).toEqual(
      '<p>Email address must be properly formatted (e.g., user@example.com).</p><p>Email address can contain "." character only between letters or numbers.</p>',
    );
  });
});
