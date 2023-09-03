import { encodeText } from '../../app/components/utils';

describe('encodeText function', () => {
  const firstSearchText = encodeText('Liewood Ishan Puzzle');
  const secondSearchText = encodeText('Dutch Lotto Game');

  it('should return correct string for request', () => {
    expect(firstSearchText).toEqual('Liewood%20Ishan%20Puzzle');
    expect(secondSearchText).toEqual('Dutch%20Lotto%20Game');
  });
});
