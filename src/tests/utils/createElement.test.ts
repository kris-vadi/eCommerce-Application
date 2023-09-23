import { createElement } from '../../app/components/utils';

describe('createElement function', () => {
  document.body.innerHTML = '';
  const block = createElement('div', ['block']);
  block.append(createElement('p', ['block__text'], 'Example text'));
  document.body.append(block, createElement('div', ['new-block', 'empty-block']));

  const divEls = document.getElementsByTagName('div');
  const pEls = divEls[0].getElementsByTagName('p');

  it('should create elements with received tags', () => {
    expect(divEls).toHaveLength(2);
    expect(pEls).toHaveLength(1);
  });

  it('should add classes to elements', () => {
    expect(divEls[0].classList).toContain('block');
    expect(Array.from(divEls[1].classList)).toEqual(expect.arrayContaining(['new-block', 'empty-block']));
    expect(Array.from(pEls[0].classList)).toEqual(expect.arrayContaining(['block__text']));
  });

  it('should add text to elements if it is received', () => {
    expect(pEls[0].textContent).toEqual('Example text');
  });
});
