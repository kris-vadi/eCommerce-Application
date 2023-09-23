import Main from '../components/main';
import { createElement } from '../components/utils';

class Terms {
  public drawTerms(): HTMLDivElement {
    const terms = createElement('div', ['terms', 'main__wrapper', 'main__wrapper_thin']) as HTMLDivElement;
    const title = createElement('h2', ['terms__title'], 'Terms & conditions') as HTMLDivElement;
    const decorator = Main.createTitleDecorator() as HTMLDivElement;

    terms.append(title, decorator);
    return terms;
  }
}

export default Terms;
