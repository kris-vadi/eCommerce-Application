import Main from '../components/main';
import { createElement } from '../components/utils';

class Contacts {
  public drawContacts(): HTMLDivElement {
    const contacts = createElement('div', ['contacts', 'main__wrapper', 'main__wrapper_thin']) as HTMLDivElement;
    const title = createElement('h2', ['about-us__title'], 'Contacts') as HTMLHeadingElement;
    const decorator = Main.createTitleDecorator() as HTMLDivElement;
    const text = `
    <p class="paragraph">Visit our shops. We stock a wide variety of toys, essentials, decor, accessories and more, for the customer who is looking for quality at affordable prices.</p>
    `;
    const content = createElement('div', ['about-us__content'], text) as HTMLDivElement;
    const hoursTitle = createElement('h4', [], 'Office Hours:') as HTMLHeadingElement;
    const hours = createElement('div', [], 'Mon-Fri 10am-4pm (GMT) Excl. Bank Holidays') as HTMLDivElement;
    const adressTitle = createElement('h4', [], 'Address:') as HTMLHeadingElement;
    const address = createElement('div', [], '6 Saryarka avenue, 020000</br>Astana, Kazakhstan') as HTMLDivElement;
    const info = this.drawInfo() as HTMLDivElement;

    contacts.append(title, decorator, content, hoursTitle, hours, adressTitle, address, info);
    return contacts;
  }

  private drawInfo(): HTMLDivElement {
    const info = createElement('div', ['contacts__info']) as HTMLDivElement;
    const tel = createElement('a', ['contacts__tel'], '<h4>+7(777)123-45-67</h4>') as HTMLLinkElement;
    const email = createElement('a', ['contacts__email', 'footer__email'], '<h3>info@toys.com</h3>') as HTMLLinkElement;
    tel.href = 'tel:+77771234567';
    email.href = 'mailto:info@toys.com';

    info.append(tel, email);
    return info;
  }
}

export default Contacts;
