import { createElement, encodeText } from './utils';
import Sidebar from './sidebar';
import Router from '../router/router';
import { pages } from '../router/pages';
import { validateInput } from './validation';
import { getLoginData, getRegisterData } from '../api/helpers/getDataFromInput';
import { checkValidity } from '../api/helpers/checkValidity';
import { loginCustomer } from '../api/customer/loginCustomer';
import createCustomer from '../api/customer/createCustomer';
import User from './user';
import getAllProducts from '../api/getProduct/getAllProducts';
import {
  catalogQueryParams,
  productAgeSelectedIds,
  productGendersSelectedIds,
  productTypesSelectedIds,
} from '../state/state';
import Catalog from '../pages/catalog';
import Filters from './filters';
import { sorterParametrs } from './constants';
import getProductsBySearch from '../api/getProduct/getProductsBySearch';
import { addNewQueryParam } from '../api/helpers/utils';

class Main {
  mainElement: HTMLDivElement;

  sidebar: Sidebar;

  sidebarWrapper: HTMLDivElement;

  constructor(router: Router) {
    this.sidebar = new Sidebar();
    this.sidebarWrapper = this.sidebar.drawSidebar();
    this.mainElement = this.drawMain();
    this.setEventListeners(router);
  }

  public drawMain(): HTMLDivElement {
    const body = document.querySelector('body') as HTMLBodyElement;
    const main = createElement('div', ['main']) as HTMLDivElement;
    const dimming = createElement('div', ['sidebar__dimming']);

    body.append(main, this.sidebarWrapper, dimming);

    return main;
  }

  static setContent(element: HTMLDivElement): void {
    const main = document.querySelector('.main') as HTMLDivElement;
    const content = element.outerHTML;
    main.innerHTML = content;
  }

  static createTitleDecorator(): HTMLDivElement {
    const decorator = createElement('div', ['decorator']) as HTMLDivElement;
    const blue = createElement('div', ['decorator__blue']) as HTMLDivElement;
    const peach = createElement('div', ['decorator__peach']) as HTMLDivElement;
    const green = createElement('div', ['decorator__green']) as HTMLDivElement;

    decorator.append(blue, peach, green);
    return decorator;
  }

  private async loginViaForm(target: HTMLFormElement, router: Router): Promise<void> {
    const submitBtn = document.querySelector('.auth-btn.submit-login') as HTMLButtonElement;
    const apiStatus = document.querySelector('.api-status') as HTMLParagraphElement;
    const data = getLoginData(target as HTMLFormElement);

    submitBtn.setAttribute('disabled', 'true');
    await loginCustomer(data.username, data.password);

    if (apiStatus.classList.contains('success-status')) {
      setTimeout(() => {
        router.navigate(pages.MAIN);
        User.userLogin();
      }, 1500);
    } else {
      submitBtn.removeAttribute('disabled');
    }
  }

  private async registerViaForm(router: Router): Promise<void> {
    const submitBtn = document.querySelector('.auth-btn.submit-register') as HTMLButtonElement;
    const apiStatus = document.querySelector('.api-status') as HTMLParagraphElement;
    const data = getRegisterData();
    const defaultBilling = document.getElementById('as-default-billing') as HTMLInputElement;
    const defaultShipping = document.getElementById('as-default-shipping') as HTMLInputElement;
    const checkDefaultBilling = defaultBilling.checked;
    const checkDefaultShipping = defaultShipping.checked;

    submitBtn.setAttribute('disabled', 'true');
    await createCustomer(data, checkDefaultBilling, checkDefaultShipping);

    if (apiStatus.classList.contains('success-status__register')) {
      setTimeout(() => {
        router.navigate(pages.MAIN);
        User.userLogin();
      }, 1500);
    } else {
      submitBtn.removeAttribute('disabled');
    }
  }

  private toggleAccordion(id: string, target: HTMLElement, className: string): void {
    const content = document.querySelector(`[data-content = ${id}]`);

    if (target.classList.contains(`${className}__item_active`)) {
      target.classList.remove(`${className}__item_active`);
      content?.classList.add(`${className}__content_hidden`);
    } else {
      target.classList.add(`${className}__item_active`);
      content?.classList.remove(`${className}__content_hidden`);
    }
  }

  private redrawProducts(): void {
    getAllProducts().then(() => {
      Catalog.drawProducts();
    });
  }

  private addFilterNavigationForCheckbox(currentTarget: HTMLInputElement): void {
    if (currentTarget.checked === true) {
      switch (currentTarget.dataset.filters) {
        case 'age':
          productAgeSelectedIds.add(`%22${currentTarget.id}%22`);
          addNewQueryParam(
            'age',
            'where',
            `masterData%28current%28categories%28id%20in%20%28${Array.from(productAgeSelectedIds).join(
              ',%20',
            )}%29%29%29%29`,
          );
          break;
        case 'genders':
          productGendersSelectedIds.add(`%22${currentTarget.id}%22`);
          addNewQueryParam(
            'genders',
            'where',
            `masterData%28current%28categories%28id%20in%20%28${Array.from(productGendersSelectedIds).join(
              ',%20',
            )}%29%29%29%29`,
          );
          break;
        case 'product-type':
          productTypesSelectedIds.add(`%22${currentTarget.id}%22`);
          addNewQueryParam(
            'product-type',
            'where',
            `productType%28id%20in%20%28${Array.from(productTypesSelectedIds).join(',%20')}%29%29`,
          );
          break;
      }
      this.redrawProducts();
    } else {
      switch (currentTarget.dataset.filters) {
        case 'age':
          productAgeSelectedIds.delete(`%22${currentTarget.id}%22`);
          addNewQueryParam(
            'age',
            'where',
            `masterData%28current%28categories%28id%20in%20%28${Array.from(productAgeSelectedIds).join(
              ',%20',
            )}%29%29%29%29`,
          );
          if (productAgeSelectedIds.size === 0) {
            catalogQueryParams.delete('age');
          }
          break;
        case 'genders':
          productGendersSelectedIds.delete(`%22${currentTarget.id}%22`);
          addNewQueryParam(
            'genders',
            'where',
            `masterData%28current%28categories%28id%20in%20%28${Array.from(productGendersSelectedIds).join(
              ',%20',
            )}%29%29%29%29`,
          );
          if (productGendersSelectedIds.size === 0) {
            catalogQueryParams.delete('genders');
          }
          break;
        case 'product-type':
          productTypesSelectedIds.delete(`%22${currentTarget.id}%22`);
          addNewQueryParam(
            'product-type',
            'where',
            `productType%28id%20in%20%28${Array.from(productTypesSelectedIds).join(',%20')}%29%29`,
          );
          if (productTypesSelectedIds.size === 0) {
            catalogQueryParams.delete('product-type');
          }
          break;
      }
      this.redrawProducts();
    }
  }

  private makeMiniActive(slideIndex: number): void {
    const minis = document.querySelectorAll('.product-card__mini') as NodeListOf<HTMLDivElement>;

    minis.forEach((mini) => {
      mini.classList.remove('active-mini');
    });
    minis[slideIndex - 1].classList.add('active-mini');
  }

  private switchNextSlide(): void {
    const cardWrapper = document.querySelector('.product-card') as HTMLDivElement;
    let currentIndex = +cardWrapper.getAttribute('data-slideIndex')!;

    const slidesRow = document.querySelector('.product-card__slides-row') as HTMLDivElement;
    const slides = document.querySelectorAll('.product-card__slide') as NodeListOf<HTMLDivElement>;
    const width = slides[0].clientWidth + 60;

    const slidesRowModal = document.querySelector('.modal-card__slides-row') as HTMLDivElement;
    const slidesModal = document.querySelectorAll('.modal-card__slide') as NodeListOf<HTMLDivElement>;
    const widthModal = slidesModal[0].clientWidth + 60;

    if (currentIndex > slides.length - 1) {
      currentIndex = 1;
      cardWrapper.setAttribute('data-slideIndex', `${currentIndex}`);

      slidesRow.style.transform = `none`;
      slidesRowModal.style.transform = `none`;
    } else {
      slidesRow.style.transform = `translateX(${-width * currentIndex}px)`;
      slidesRowModal.style.transform = `translateX(${-widthModal * currentIndex}px)`;

      currentIndex++;
      cardWrapper.setAttribute('data-slideIndex', `${currentIndex}`);
    }
    this.makeMiniActive(currentIndex);
  }

  private switchPrevSlide(): void {
    const cardWrapper = document.querySelector('.product-card') as HTMLDivElement;
    let currentIndex = +cardWrapper.getAttribute('data-slideIndex')!;

    const slidesRow = document.querySelector('.product-card__slides-row') as HTMLDivElement;
    const slides = document.querySelectorAll('.product-card__slide') as NodeListOf<HTMLDivElement>;
    const width = slides[0].clientWidth + 60;

    const slidesRowModal = document.querySelector('.modal-card__slides-row') as HTMLDivElement;
    const slidesModal = document.querySelectorAll('.modal-card__slide') as NodeListOf<HTMLDivElement>;
    const widthModal = slidesModal[0].clientWidth + 60;

    if (currentIndex <= 1) {
      currentIndex = slides.length;
      cardWrapper.setAttribute('data-slideIndex', `${currentIndex}`);

      slidesRow.style.transform = `translateX(${-width * (currentIndex - 1)}px)`;
      slidesRowModal.style.transform = `translateX(${-widthModal * (currentIndex - 1)}px)`;
    } else {
      currentIndex--;
      cardWrapper.setAttribute('data-slideIndex', `${currentIndex}`);

      slidesRow.style.transform = `translateX(${-width * (currentIndex - 1)}px)`;
      slidesRowModal.style.transform = `translateX(${-widthModal * (currentIndex - 1)}px)`;
    }
    this.makeMiniActive(currentIndex);
  }

  private getImagebyMini(target: HTMLElement): void {
    const cardWrapper = document.querySelector('.product-card') as HTMLDivElement;
    let currentIndex = +cardWrapper.getAttribute('data-slideIndex')!;

    const slidesRow = document.querySelector('.product-card__slides-row') as HTMLDivElement;
    const slides = document.querySelectorAll('.product-card__slide') as NodeListOf<HTMLDivElement>;
    const width = slides[0].clientWidth + 60;

    currentIndex = +target.getAttribute('data-index')!;
    cardWrapper.setAttribute('data-slideIndex', `${currentIndex}`);
    slidesRow.style.transform = `translateX(${-width * (currentIndex - 1)}px)`;
    this.makeMiniActive(currentIndex);
  }

  private toggleCardModal(slideIndex: number): void {
    const modal = document.querySelector('.modal-card__dimming');
    modal?.classList.toggle('modal-active');
    if (modal?.classList.contains('modal-active')) {
      const slidesRow = document.querySelector('.modal-card__slides-row') as HTMLDivElement;
      const slides = document.querySelectorAll('.modal-card__slide') as NodeListOf<HTMLDivElement>;
      const width = slides[0].clientWidth + 60;

      slidesRow.style.transform = `translateX(${-width * (slideIndex - 1)}px)`;
    } else {
      const slidesRow = document.querySelector('.product-card__slides-row') as HTMLDivElement;
      const slides = document.querySelectorAll('.product-card__slide') as NodeListOf<HTMLDivElement>;
      const miniRow = document.querySelector('.product-card__minis-row');
      const width = slides[0].clientWidth + 60;

      slidesRow.style.transform = `translateX(${-width * (slideIndex - 1)}px)`;
      if (miniRow) {
        this.makeMiniActive(slideIndex);
      }
    }
  }

  private deleteSortFromQueryParam(): void {
    Object.keys(sorterParametrs).forEach((key: string) => {
      catalogQueryParams.delete(key);
    });
  }

  private addFilterNavigationForSelect(currentTarget: HTMLSelectElement): void {
    switch (currentTarget.value) {
      case 'name-asc':
        this.deleteSortFromQueryParam();
        addNewQueryParam(currentTarget.value, 'sort', `masterData.current.name.en-US%20asc`);
        this.redrawProducts();
        break;
      case 'name-desc':
        this.deleteSortFromQueryParam();
        addNewQueryParam(currentTarget.value, 'sort', `masterData.current.name.en-US%20desc`);
        this.redrawProducts();
        break;
      case 'price-asc':
        this.deleteSortFromQueryParam();
        addNewQueryParam(currentTarget.value, 'sort', `key%20asc`);
        this.redrawProducts();
        break;
      case 'price-desc':
        this.deleteSortFromQueryParam();
        addNewQueryParam(currentTarget.value, 'sort', `key%20desc`);
        this.redrawProducts();
        break;
      default:
        localStorage.removeItem('sorted_products');
        this.deleteSortFromQueryParam();
        this.redrawProducts();
        break;
    }
  }

  private addFilterNavigationForSearch(currentTarget: HTMLInputElement): void {
    const close = document.querySelector('.filters__close_search') as HTMLParagraphElement;
    close.classList.remove('filters__close_hidden');
    if (currentTarget.value.length === 0) {
      localStorage.removeItem('search_products');
      Catalog.drawProducts();
      close.classList.add('filters__close_hidden');
    } else {
      getProductsBySearch(encodeText(currentTarget.value)).then(() => {
        Catalog.drawProducts();
      });
    }
  }

  private clearFilterForSearch(): void {
    const close = document.querySelector('.filters__close_search') as HTMLParagraphElement;
    const search = document.querySelector('.filters__search') as HTMLInputElement;
    search.value = '';
    localStorage.removeItem('search_products');
    close.classList.add('filters__close_hidden');
    this.redrawProducts();
  }

  private addFilterNavigationForPrices(): void {
    const close = document.querySelector('.filters__close_prices') as HTMLParagraphElement;
    close.classList.remove('filters__close_hidden');
    const from = document.getElementById('price-from') as HTMLInputElement;
    const to = document.getElementById('price-to') as HTMLInputElement;
    const fromValue = Number(from.value) * 100;
    const toValue = to.value ? Number(to.value) * 100 : 5000000;
    addNewQueryParam(
      'price',
      'where',
      `masterData%28current%28masterVariant%28prices%28country%3D%22US%22%20and%20%28%28value%28centAmount%20%3E%3D%20${fromValue}%29%20and%20value%28centAmount%20%3C%3D%20${toValue}%29%29%20or%20discounted%28%28value%28centAmount%20%3E%3D%20${fromValue}%29%20and%20value%28centAmount%20%3C%3D%20${toValue}%29%29%29%29%29%29%29%29`,
    );
    this.redrawProducts();
  }

  private clearFilterForPrices(): void {
    const from = document.getElementById('price-from') as HTMLInputElement;
    const to = document.getElementById('price-to') as HTMLInputElement;
    from.value = '';
    to.value = '';
    catalogQueryParams.delete('price');
    this.redrawProducts();
  }

  private setEventListeners(router: Router): void {
    document.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('sidebar__link') && target.dataset.page === 'main') {
        router.navigate(pages.MAIN);
        this.sidebar.closeSidebar();
      }

      if (target.classList.contains('logo') || target.parentElement?.classList.contains('logo')) {
        router.navigate(pages.MAIN);
        this.sidebar.closeSidebar();
      }

      if (target.id === 'form-reg-btn') {
        router.navigate(pages.REGISTRATION);
      }

      if (target.id === 'form-auth-btn') {
        router.navigate(pages.AUTORIZATION);
      }

      if (target.classList.contains('profile__item')) {
        this.toggleAccordion(target.id, target, 'profile');
      }

      if (target.classList.contains('main-page__page')) {
        const pageName = target.innerText.toLocaleLowerCase();
        router.navigate(pageName === 'main' ? pages.MAIN : pageName);
      }

      if (
        target.classList.contains('product-card__next-slide') ||
        target.classList.contains('modal-card__next-slide')
      ) {
        this.switchNextSlide();
      }

      if (
        target.classList.contains('product-card__prev-slide') ||
        target.classList.contains('modal-card__prev-slide')
      ) {
        this.switchPrevSlide();
      }

      if (target.classList.contains('product-card__mini-img')) {
        this.getImagebyMini(target);
      }

      if (
        target.classList.contains('product-card__slide-img') ||
        target.classList.contains('modal-card__close-btn') ||
        (target.classList.contains('modal-card__dimming') && target !== document.querySelector('.modal-card__wrapper'))
      ) {
        const cardWrapper = document.querySelector('.product-card') as HTMLDivElement;
        const currentIndex = +cardWrapper.getAttribute('data-slideIndex')!;
        this.toggleCardModal(currentIndex);
      }
      // });

      if (target.classList.contains('filters__item')) {
        this.toggleAccordion(target.id, target, 'filters');
      }

      if (target.classList.contains('filters__checkbox')) {
        const currentTarget = target as HTMLInputElement;
        this.addFilterNavigationForCheckbox(currentTarget);
      }

      if (target.classList.contains('filters__button')) {
        Filters.resetAllFilters();
        this.redrawProducts();
      }

      if (target.classList.contains('mobile-filters__item')) {
        this.toggleAccordion('mobile-filters', target, 'mobile-filters');
      }

      if (target.classList.contains('filters__apply_prices')) {
        this.addFilterNavigationForPrices();
      }

      if (target.classList.contains('filters__close_prices')) {
        this.clearFilterForPrices();
      }

      if (target.classList.contains('filters__close_search')) {
        this.clearFilterForSearch();
      }

      if (target.classList.contains('catalog__product')) {
        const currentID = target.id;
        router.navigate(`${pages.CATALOG}/${currentID}`);
      }

      if (target.parentElement?.classList.contains('catalog__product')) {
        const parentDiv = target.parentNode as HTMLDivElement;
        const currentID = parentDiv.id;
        router.navigate(`${pages.CATALOG}/${currentID}`);
      }
    });

    document.addEventListener('submit', async (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('login-form')) {
        event.preventDefault();
        const isValid: boolean = checkValidity();

        if (isValid) {
          this.loginViaForm(target as HTMLFormElement, router);
        }
      }

      if (target.classList.contains('register-form')) {
        event.preventDefault();
        const isValid: boolean = checkValidity();

        if (isValid) {
          this.registerViaForm(router);
        }
      }

      if (target.classList.contains('product-card__form')) {
        event.preventDefault();
      }
    });

    document.addEventListener('input', (event: Event): void => {
      const target = event.target as HTMLInputElement;

      if (
        !target.parentElement?.classList.contains('filters__checkbox-block') &&
        target.parentElement?.classList.contains('checkbox-block')
      ) {
        const apiStatus = document.querySelector('.api-status') as HTMLParagraphElement;
        apiStatus.className = 'api-status';
        apiStatus.innerHTML = '';

        if (target.classList.contains('auth-input')) {
          const notation = document.querySelector(`[data-input="${target.id}"]`) as HTMLParagraphElement;
          if (notation) {
            validateInput(target, notation);
          }
        }
      }
    });

    document.addEventListener('change', (event: Event): void => {
      const target = event.target as HTMLElement;

      if (target.id === 'are-same-addresses') {
        const shippingBlock = document.getElementById('shipping-block') as HTMLDivElement;
        const shippingInputs = [
          document.getElementById('shipping-country') as HTMLInputElement,
          document.getElementById('shipping-city') as HTMLInputElement,
          document.getElementById('shipping-streetName') as HTMLInputElement,
          document.getElementById('shipping-postalCode') as HTMLInputElement,
        ];
        shippingBlock.classList.toggle('hidden');
        if (shippingInputs[0].hasAttribute('required')) {
          shippingInputs.forEach((input) => {
            input.removeAttribute('required');
          });
        } else {
          shippingInputs.forEach((input) => {
            input.setAttribute('required', 'true');
          });
        }
      }

      if (target.id === 'billing-country' || target.id === 'shipping-country') {
        const inputId = `${target.id.split('-')[0]}-postalCode`;
        const postalCode = document.getElementById(inputId) as HTMLInputElement;
        const notation = document.querySelector(`[data-input="${inputId}"]`) as HTMLParagraphElement;
        if (notation) {
          validateInput(postalCode, notation);
        }
      }

      if (target.id === 'showPassword') {
        const passwordInput = document.getElementById('password');
        if (passwordInput && passwordInput instanceof HTMLInputElement) {
          passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
        }
      }

      if (target.classList.contains('filters__select')) {
        const currentTarget = target as HTMLSelectElement;
        this.addFilterNavigationForSelect(currentTarget);
      }

      if (target.classList.contains('filters__search')) {
        const currentTarget = target as HTMLInputElement;
        this.addFilterNavigationForSearch(currentTarget);
      }
    });
  }
}

export default Main;
