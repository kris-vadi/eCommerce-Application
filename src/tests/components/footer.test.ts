import Router from '../../app/router/router';
import Footer from '../../app/components/footer';
import { pages } from '../../app/router/pages';

describe('Class Footer: drawFooter function', () => {
  document.body.innerHTML = '';
  const routes = [
    {
      path: `${pages.MAIN}`,
      callback: (): void => {},
    },
  ];
  new Footer(new Router(routes));
  const footer = document.querySelector('.footer');
  const logo = document.querySelector('.footer__logo');
  const navItems = document.querySelectorAll('.footer__nav-item');
  const address = document.querySelector('.footer__address');
  const tel = document.querySelector('.footer__tel');
  const email = document.querySelector('.footer__email');
  const footerIcons = document.querySelector('.footer_social-icons')?.children;

  it('should create footer', () => {
    expect(footer).not.toBeNull();
  });

  it('should create navigation', () => {
    expect(logo?.innerHTML).toBe(
      `<h1 class="logo">t<span class="logo__peach">o</span><span class="logo__green">y</span><span class="logo__wine">s</span></h1>`,
    );
    expect(navItems).toHaveLength(3);
  });

  it('should create info block', () => {
    expect(address?.innerHTML).toEqual(`<p>6 Saryarka avenue<br>Astana, Kazakhstan</p>`);
    expect(tel?.innerHTML).toEqual('<h3>+7(777)123-45-67</h3>');
    expect(email?.innerHTML).toEqual('<h3>info@toys.com</h3>');
  });

  it('should create social icons', () => {
    expect(footerIcons).toHaveLength(3);
  });
});
