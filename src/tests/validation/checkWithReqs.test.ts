import { createInputElement } from '../../app/components/utils';
import { checkWithReqs } from '../../app/components/validation';

describe('checkWithReqs function', () => {
  document.body.innerHTML = '';
  const nameBlock = createInputElement('text', 'Your name', 'user-name', 'reg');
  document.body.append(nameBlock);

  const reqs: [RegExp, string][] = [
    [/^[a-zA-Z]{4,}$/, 'Only letters.'],
    [/[0-9]+/, 'At least 1 digit.'],
  ];
  const inputElem = document.getElementById('user-name') as HTMLInputElement;
  inputElem.value = 'Maxx';

  const warning = checkWithReqs(reqs, inputElem.value);

  it('should compare text with templates', () => {
    expect(inputElem.value).toMatch(reqs[0][0]);
    expect(inputElem.value).not.toMatch(reqs[1][0]);
  });

  it('should add warnings to output', () => {
    expect(warning).toBeTruthy();
    expect(warning).not.toMatch('Only letters.');
    expect(warning).toMatch('At least 1 digit.');
  });

  it('should return warning', () => {
    expect(warning).toEqual('At least 1 digit.');
  });
});
