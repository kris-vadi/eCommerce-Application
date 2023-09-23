import { checkDate } from '../../app/components/validation';

describe('checkDate function', () => {
  const firstDate = checkDate('12.12.2015');
  const SecondDate = checkDate('05.05.1985');

  it('should check age and return correct warning', () => {
    expect(firstDate).toBeTruthy();
    expect(SecondDate).toBeFalsy();
    expect(firstDate).toEqual('<p>You are too young. 13+ Only.</p>');
    expect(SecondDate).not.toContain('<p>You are too young. 13+ Only.</p>');
    expect(SecondDate).toEqual('');
  });
});
