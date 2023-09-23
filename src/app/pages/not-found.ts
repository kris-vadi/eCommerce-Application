import { pages } from '../router/pages';
import Router from '../router/router';
import { createElement } from '../components/utils';

class NotFound {
  constructor(router: Router) {
    this.setEventListeners(router);
  }

  public drawNotFound(): HTMLDivElement {
    const wrapper = createElement('div', ['not-found', 'main__wrapper']) as HTMLDivElement;
    const info = createElement('div', ['not-found__info']) as HTMLDivElement;
    const heading = createElement('h2', ['not-found__heading'], 'ERROR 404') as HTMLElement;
    const message = createElement(
      'p',
      ['not-found__message'],
      'Oops! The page you are looking for could not be found.',
    ) as HTMLParagraphElement;
    const button = createElement('button', ['not-found__button', 'button'], 'BACK TO HOME') as HTMLButtonElement;
    const img = createElement('div', ['not-found__img']) as HTMLDivElement;

    info.append(heading, message, button);
    wrapper.append(info, img);

    return wrapper;
  }

  private setEventListeners(router: Router): void {
    document.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('not-found__button')) {
        router.navigate(pages.MAIN);
      }
    });
  }
}

export default NotFound;
