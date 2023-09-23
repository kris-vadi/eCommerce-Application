import { createInputElement } from '../../app/components/utils';

describe('createCheckBoxElement function', () => {
  document.body.innerHTML = '';
  const ageBlock = createInputElement('number', 'Your age', 'user-age', 'reg', false, { min: 0, max: 100 });
  const nameBlock = createInputElement('text', 'Your name', 'user-name', 'reg');
  document.body.append(ageBlock, nameBlock);

  const inputElems = document.getElementsByTagName('input');
  const [ageInput, nameInput] = inputElems;
  const labels = document.querySelectorAll('.reg-label');

  it('should create input elements with received attributes', () => {
    expect(inputElems).toHaveLength(2);
    expect(ageInput.getAttribute('max')).toBe('100');
    expect(ageInput.getAttribute('min')).toBe('0');
    expect(ageInput.required).toBeFalsy();
    expect(nameInput.required).toBeTruthy();
  });

  it('should add classes to elements and id to input element', () => {
    expect(nameBlock.classList).toContain('reg-item');
    expect(nameInput.classList).toContain('reg-input');
    expect(labels).toHaveLength(2);
    expect(ageInput.id).toEqual('user-age');
  });

  it('should add text to label', () => {
    expect(labels[0].textContent).toEqual('Your age');
    expect(labels[1].textContent).toEqual('Your name');
  });
});
