import Terms from '../../app/pages/terms-conditions';

describe('Class Terms: drawTerms function', () => {
  document.body.innerHTML = '';
  const cart = new Terms();
  document.body.append(cart.drawTerms());

  it('should create terms page with its elements', () => {
    const terms = document.querySelector('.terms');
    expect(terms).not.toBeNull();
    expect(terms instanceof HTMLDivElement).toBeTruthy();
    expect(terms?.childElementCount).toEqual(2);
    expect(terms?.children[0].innerHTML).toMatch('Terms');
    expect(terms?.children[0] instanceof HTMLHeadingElement).toBeTruthy();
    expect(terms?.children[0].classList).toContain('terms__title');
    expect(terms?.children[1].classList).toContain('decorator');
    expect(terms?.children[1].childElementCount).toBe(3);
  });
});
