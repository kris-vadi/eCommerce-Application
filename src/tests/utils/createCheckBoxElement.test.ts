import { createCheckBoxElement } from '../../app/components/utils';

describe('createCheckBoxElement function', () => {
  document.body.innerHTML = '';
  const checkBlock = createCheckBoxElement('Accept terms', 'accept-terms', true);
  document.body.append(checkBlock);

  const checkItems = document.getElementsByTagName('input');
  const checkItem = checkItems[0];
  const label = document.querySelector('.checkbox-label');

  it('should create checkbox element', () => {
    expect(checkItems).toHaveLength(1);
    expect(checkItem.getAttribute('type')).toEqual('checkbox');
  });

  it('should add classes and attributes to elements and id to input element', () => {
    expect(checkItem.classList).toContain('checkbox-input');
    expect(label).not.toBeNull();
    expect(checkItem.id).toEqual('accept-terms');
    expect(checkItem.required).toBeTruthy();
  });

  it('should add text to label', () => {
    expect(label?.textContent).toEqual('Accept terms');
  });
});
