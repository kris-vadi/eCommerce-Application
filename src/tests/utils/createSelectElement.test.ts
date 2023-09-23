import { createSelectElement } from '../../app/components/utils';

describe('createSelectElement function', () => {
  document.body.innerHTML = '';
  const list = { green: '#008000', blue: '#0000ff', red: '#ff0000' };
  const selectBlock = createSelectElement(list, 'Choose color', 'color-choice', 'color');
  document.body.append(selectBlock);

  const selectItems = document.getElementsByTagName('select');
  const selectItem = selectItems[0];
  const options = document.getElementsByTagName('option');
  const label = document.querySelector('.color-label');

  it('should create select element with received options', () => {
    expect(selectItems).toHaveLength(1);
    expect(options).toHaveLength(3);
  });

  it('should add classes to elements and id to input element', () => {
    expect(selectItem.classList).toContain('color-input');
    expect(label).not.toBeNull();
    expect(selectItem.id).toEqual('color-choice');
  });

  it('should add text to label and options', () => {
    expect(label?.textContent).toEqual('Choose color');
    expect(options[0].textContent).toEqual('green');
  });

  it('should add value to options', () => {
    expect(options[1].value).toEqual('#0000ff');
  });
});
