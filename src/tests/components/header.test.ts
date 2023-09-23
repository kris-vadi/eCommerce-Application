import Router from '../../app/router/router';
import Header from '../../app/components/header';
import { pages } from '../../app/router/pages';

describe('Class Header: drawHeader function', () => {
  document.body.innerHTML = '';
  const routes = [
    {
      path: `${pages.MAIN}`,
      callback: (): void => {},
    },
  ];
  new Header(new Router(routes));
  const header = document.querySelector('.header');

  it('should create header', () => {
    expect(header).not.toBeNull();
  });

  it('should create all needed icons', () => {
    const headerIcons = document.querySelectorAll('.header__icon');
    expect(headerIcons).toHaveLength(4);
  });
});
