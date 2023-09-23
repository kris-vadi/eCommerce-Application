import User from '../../app/components/user';
import Router from '../../app/router/router';
import Header from '../../app/components/header';
import { pages } from '../../app/router/pages';

describe('toggleLogoutIcon function', () => {
  document.body.innerHTML = '';
  const routes = [
    {
      path: `${pages.MAIN}`,
      callback: (): void => {},
    },
  ];
  new Header(new Router(routes));
  const logoutIcon = document.querySelector('.header__icon-logout') as HTMLDivElement;
  User.toggleLogoutIcon();
  User.toggleLogoutIcon();
  it('logout icon should be hidden', () => {
    expect(logoutIcon?.classList).toContain('header__icon-logout_hidden');
  });
});
