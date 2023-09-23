import { checkOtherInput } from '../../app/components/validation';

describe('checkOtherInput function', () => {
  const firstName = checkOtherInput('firstName', 'Name8');
  const lastName = checkOtherInput('lastName', 'Surname');
  const streetName = checkOtherInput('streetName', '9');
  const city = checkOtherInput('city', 'M@');
  const age = checkOtherInput('age', '15');

  it('should compare input with template and add warnings if it is not correct', () => {
    expect(firstName).toBeTruthy();
    expect(lastName).toBeFalsy();
    expect(streetName).toBeFalsy();
    expect(city).toBeTruthy();
    expect(age).toBeFalsy();
    expect(city).toMatch('Must contain at least one character (use a-z, A-Z, -) and no special characters or numbers');
  });

  it('should return warning', () => {
    expect(firstName).toEqual(
      'Must contain at least one character (use a-z, A-Z) and no special characters or numbers',
    );
    expect(city).toEqual('Must contain at least one character (use a-z, A-Z, -) and no special characters or numbers');
    expect(age).toEqual('');
  });
});
