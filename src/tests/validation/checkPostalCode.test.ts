import { createSelectElement, createInputElement } from '../../app/components/utils';
import { checkPostalCode } from '../../app/components/validation';

describe('checkPostalCode function', () => {
  const countries = { '': '', US: 'US', KZ: 'KZ' };
  document.body.innerHTML = '';
  const countryBlock = createSelectElement(countries, 'Your country', 'user-country', 'reg');
  const postalBlock = createInputElement('number', 'Your postal code', 'user-postalCode', 'reg');
  document.body.append(countryBlock, postalBlock);

  const countryElem = document.getElementById('user-country') as HTMLInputElement;
  countryElem.value = 'US';
  const postalCode = document.getElementById('user-postalCode') as HTMLInputElement;
  postalCode.value = '1234567';

  let warning = checkPostalCode(postalCode);

  it('should define code template', () => {
    expect(countryElem.value).toMatch('US');
    expect(postalCode.value).not.toMatch(/^\d{5}$/);
  });

  it('should add warnings to output', () => {
    expect(warning).toBeTruthy();
    expect(warning).toMatch('Must follow the format for the country (5 digits)');
    expect(warning).not.toMatch('Must follow the format for the country (US: 5 digits, KZ: 6 digits)');
  });

  it('should return warning', () => {
    expect(warning).toEqual('Must follow the format for the country (5 digits)');
  });

  it('should change warning if country is changed', () => {
    countryElem.value = 'KZ';
    postalCode.value = '12345';
    warning = checkPostalCode(postalCode);
    expect(warning).toBeTruthy();
    expect(warning).toEqual('Must follow the format for the country (6 digits)');
  });
});
