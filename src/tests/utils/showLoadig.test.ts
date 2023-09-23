import { showLoadig } from '../../app/components/utils';

describe('showLoadig function', () => {
  showLoadig();
  const loading = document.querySelector('.main__loading') as HTMLDivElement;

  it('should create loading image', () => {
    expect(loading).not.toBeNull();
  });
});
