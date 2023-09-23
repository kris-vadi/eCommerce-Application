import { createInputElement } from '../../app/components/utils';
import { showErrorMessage } from '../../app/components/validation';

describe('showErrorMessage function', () => {
  document.body.innerHTML = '';
  const nameBlock = createInputElement('text', 'Your name', 'user-name', 'reg');
  document.body.append(nameBlock);

  const input = document.getElementById('user-name') as HTMLInputElement;
  const notation = document.querySelector(`[data-input="user-name"]`) as HTMLParagraphElement;
  showErrorMessage(input, notation, 'Incorrect input');
  const errorIcon = document.querySelector('.error-warn');

  it('should add error classes to elements', () => {
    expect(input.classList).toContain('error-input');
    expect(errorIcon).not.toBeNull();
  });

  it('should add text to warning', () => {
    expect(notation.innerHTML).toMatch(`Incorrect input`);
  });
});
