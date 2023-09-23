import { showLoadig, hideLoading } from '../../app/components/utils';

describe('hideLoading function', () => {
  showLoadig();
  hideLoading();
  const loading = document.querySelector('.main__loading') as HTMLDivElement;

  it('should delete loading image', () => {
    expect(loading).toBeNull();
  });
});
