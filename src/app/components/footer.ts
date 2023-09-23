import { createElement } from './utils';
import Router from '../router/router';
import { pages } from '../router/pages';

class Footer {
  footer: HTMLDivElement;

  constructor(router: Router) {
    this.footer = this.drawFooter();
    this.setEventListeners(router);
  }

  private drawFooter(): HTMLDivElement {
    const body = document.querySelector('body') as HTMLBodyElement;
    const footer = createElement('div', ['footer']) as HTMLDivElement;
    const wrapper = createElement('div', ['wrapper', 'footer__wrapper']) as HTMLDivElement;
    const rawInfo = createElement('div', ['footer__raw']) as HTMLDivElement;
    const rawBottom = createElement('div', ['footer__raw']) as HTMLDivElement;
    const footerNav = this.drawNav() as HTMLDivElement;
    const info = this.drawInfo() as HTMLDivElement;
    const copyright = createElement('div', ['footer__copyright'], '© 2023 Toys USA, Inc.') as HTMLDivElement;
    const socialIcons = this.drawSocialIcons() as HTMLDivElement;

    rawInfo.append(footerNav, info);
    rawBottom.append(copyright, socialIcons);
    wrapper.append(rawInfo, rawBottom);

    footer.append(wrapper);
    body.append(footer);

    return footer;
  }

  private drawNav(): HTMLDivElement {
    const nav = createElement('div', ['footer__nav']) as HTMLDivElement;
    const logo = createElement(
      'div',
      ['footer__logo'],
      '<h1 class="logo">t<span class="logo__peach">o</span><span class="logo__green">y</span><span class="logo__wine">s</span></h1>',
    ) as HTMLDivElement;
    const navList = createElement(
      'div',
      ['footer__nav-list'],
      `<p href="" class="footer__nav-item footer__nav-item_about-us">About us</p>
      <p href="" class="footer__nav-item footer__nav-item_contacts">Contacts</p>
      <p href="" class="footer__nav-item footer__nav-item_terms">Terms & conditions</p>`,
    ) as HTMLDivElement;

    nav.append(logo, navList);

    return nav;
  }

  private drawInfo(): HTMLDivElement {
    const info = createElement('div', ['footer__info']) as HTMLDivElement;
    const address = createElement(
      'div',
      ['footer__address'],
      `<p>6 Saryarka avenue</br>Astana, Kazakhstan</p>`,
    ) as HTMLDivElement;
    const tel = createElement('a', ['footer__tel'], '<h3>+7(777)123-45-67</h3>') as HTMLLinkElement;
    const email = createElement('a', ['footer__email'], '<h3>info@toys.com</h3>') as HTMLLinkElement;
    tel.href = 'tel:+77771234567';
    email.href = 'mailto:info@toys.com';

    info.append(tel, email, address);
    return info;
  }

  private drawSocialIcons(): HTMLDivElement {
    const socialIcons = createElement(
      'div',
      ['footer_social-icons'],
      `
    <a href="https://twitter.com/" class="footer__icon footer__twitter" target="_blank"></a>
    <a href="https://www.instagram.com/" class="footer__icon footer__instagram" target="_blank"></a>
    <a href="https://www.facebook.com/" class="footer__icon footer__facebook" target="_blank"></a>
    `,
    ) as HTMLDivElement;

    return socialIcons;
  }

  private setEventListeners(router: Router): void {
    this.footer.addEventListener('click', (event: Event): void => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('footer__nav-item_about-us')) {
        router.navigate(pages.ABOUT_US);
      }

      if (target.classList.contains('footer__nav-item_contacts')) {
        router.navigate(pages.CONTACTS);
      }

      if (target.classList.contains('footer__nav-item_terms')) {
        router.navigate(pages.TERMS_AND_CONDITIONS);
      }
    });
  }
}

export default Footer;
