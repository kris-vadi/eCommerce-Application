import { createInputElement } from '../../app/components/utils';
import { validateInput } from '../../app/components/validation';

describe.each([
  ['email', 'email', 'example @mail.com', '<p>Email address must not contain whitespace.</p>', 'example@mail.com'],
  ['password', 'password', 'f8F4@', 'Password must be at least 8 characters long.', 'f8F4@ggh'],
  [
    'number',
    'shipping-postalCode',
    '1234',
    'Must follow the format for the country (US: 5 digits, KZ: 6 digits)',
    '123456',
  ],
  [
    'text',
    'city',
    'abc-5',
    'Must contain at least one character (use a-z, A-Z, -) and no special characters or numbers',
    'Abc',
  ],
])(`validateInput function case %#`, (type: string, id: string, value: string, note: string, rightValue: string) => {
  document.body.innerHTML = '';
  document.body.append(createInputElement(type, 'Your text', id, 'reg'));

  const input = document.getElementById(id) as HTMLInputElement;
  input.value = value;
  const notation = document.querySelector(`[data-input="${id}"]`) as HTMLParagraphElement;
  validateInput(input, notation);
  const errorIcons = document.querySelector('.error-warn');

  it('should check input value and if it is not correct add error classes to elements', () => {
    expect(input.classList).toContain('error-input');
    expect(errorIcons).not.toBeNull();
  });

  it('should add text to warning', () => {
    expect(notation.innerHTML).toMatch(note);
  });

  it('should remove text from warning if value is correct', () => {
    input.value = rightValue;
    validateInput(input, notation);
    expect(input.classList).not.toContain('error-input');
    expect(notation.innerHTML).not.toMatch(note);
    expect(notation.innerHTML).toEqual('');
  });
});
