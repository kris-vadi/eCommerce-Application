import getProductByID from '../api/getProduct/getProductByID';
import Header from '../components/header';
import { createElement, createImageElement } from '../components/utils';
import { Product, Price, LineItem } from '../types/types';

class Card {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  public async drawCard(): Promise<HTMLDivElement> {
    const wrapper = createElement('div', ['product-card', 'main__wrapper'], '', {
      'data-slideIndex': '1',
    }) as HTMLDivElement;

    await getProductByID(this.id).then((data) => {
      const lineItem: LineItem = localStorage.cart
        ? JSON.parse(localStorage.cart).lineItems.find((item: LineItem) => item.productId === this.id)
        : undefined;
      const slider = this.drawSlider(data);
      const modal = this.drawModal(data);
      const info = createElement('div', ['product-card__info']) as HTMLDivElement;
      const heading = createElement(
        'h2',
        ['product-card__heading'],
        data.masterData.current.name['en-US'],
      ) as HTMLElement;
      const priceWrapper = this.drawPriceWrapper(data);
      const form = this.drawCartForm(this.id, lineItem);
      const smallHeading = createElement('h4', ['product-card__detail-heading'], 'Details') as HTMLElement;
      const details = createElement(
        'p',
        ['product-card__details'],
        data.masterData.current.description['en-US'],
      ) as HTMLParagraphElement;

      info.append(heading, priceWrapper, form, smallHeading, details);
      const warning = createElement('div', ['cart__warning']);
      wrapper.append(modal, slider, info, warning);
    });

    Header.addProductsNumberInBasket();

    return wrapper;
  }

  private drawSlider(data: Product): HTMLDivElement {
    const container = createElement('div', ['product-card__slider-container']) as HTMLDivElement;
    const nextBtn = createElement('span', ['product-card__next-slide'], '&#10095') as HTMLSpanElement;
    const prevBtn = createElement('span', ['product-card__prev-slide'], '&#10094') as HTMLSpanElement;
    const slidesContainer = createElement('div', ['product-card__slider']) as HTMLDivElement;
    const slidesRow = createElement('div', ['product-card__slides-row']) as HTMLDivElement;
    const minisRow = createElement('div', ['product-card__minis-row']) as HTMLDivElement;
    data.masterData.current.masterVariant.images.map((imageData, idx) => {
      const slide = createElement('div', ['product-card__slide']) as HTMLDivElement;
      const currentImg = createImageElement(imageData.url, ['product-card__slide-img']);
      const mini = createElement('div', ['product-card__mini']) as HTMLDivElement;
      if (idx === 0) {
        mini.classList.add('active-mini');
      }
      const miniImg = createImageElement(imageData.url, ['product-card__mini-img'], {
        width: '40',
        'data-index': `${idx + 1}`,
      });

      slide.append(currentImg);
      mini.append(miniImg);
      slidesRow.append(slide);
      minisRow.append(mini);
    });

    if (data.masterData.current.masterVariant.images.length > 1) {
      slidesContainer.append(slidesRow, minisRow);
      container.append(prevBtn, slidesContainer, nextBtn);
    } else {
      slidesContainer.append(slidesRow);
      container.append(slidesContainer);
    }

    return container;
  }

  private drawModal(data: Product): HTMLDivElement {
    const modalDimming = createElement('div', ['modal-card__dimming']) as HTMLDivElement;
    const modalWrapper = createElement('div', ['modal-card__wrapper']) as HTMLDivElement;
    const closeModal = createElement('button', ['modal-card__close-btn']) as HTMLButtonElement;
    const modalSlider = createElement('div', ['modal-card__slider']) as HTMLDivElement;
    const nextBtn = createElement('span', ['modal-card__next-slide'], '&#10095') as HTMLSpanElement;
    const prevBtn = createElement('span', ['modal-card__prev-slide'], '&#10094') as HTMLSpanElement;
    const slidesRow = createElement('div', ['modal-card__slides-row']) as HTMLDivElement;
    data.masterData.current.masterVariant.images.map((imageData, idx) => {
      const slide = createElement('div', ['modal-card__slide']) as HTMLDivElement;
      const currentImg = createImageElement(imageData.url, ['modal-card__slide-img'], {
        'data-index': `${idx + 1}`,
      }) as HTMLImageElement;

      slide.append(currentImg);
      slidesRow.append(slide);
    });

    if (data.masterData.current.masterVariant.images.length > 1) {
      modalSlider.append(prevBtn, slidesRow, nextBtn);
    } else {
      modalSlider.append(slidesRow);
    }
    modalWrapper.append(closeModal, modalSlider);
    modalDimming.append(modalWrapper);

    return modalDimming;
  }

  private drawPriceWrapper(data: Product): HTMLDivElement {
    const priceWrapper = createElement('div', ['product-card__price-wrapper']) as HTMLDivElement;
    const discountedPrice = createElement('span', ['product-card__discounted-price']) as HTMLSpanElement;
    const fullPrice = createElement('span', ['product-card__price']) as HTMLSpanElement;
    data.masterData.current.masterVariant.prices.forEach((price: Price): void => {
      if (price.country === 'US') {
        if (price.discounted) {
          discountedPrice.innerHTML = `${(
            price.discounted.value.centAmount /
            10 ** price.discounted.value.fractionDigits
          ).toFixed(2)}${price.value.currencyCode}`;
          fullPrice.classList.add('product-card__old-price');
          priceWrapper.append(discountedPrice);
        }
        fullPrice.innerHTML = `${(price.value.centAmount / 10 ** price.value.fractionDigits).toFixed(2)}${
          price.value.currencyCode
        }`;
        priceWrapper.append(fullPrice);
      }
    });

    return priceWrapper;
  }

  private drawCartForm(id: string, lineItem: LineItem): HTMLFormElement {
    const form = createElement('form', ['product-card__form']) as HTMLFormElement;
    form.dataset.id = id;
    const quantityWrapper = createElement('div', ['product-card__quantity-wrapper']) as HTMLDivElement;
    const decreaseQuanity = createElement(
      'button',
      ['product-card__decrease-quantity', 'quantity-btn'],
      '−',
    ) as HTMLButtonElement;
    const quantity = createElement('div', ['product-card__quantity']) as HTMLInputElement;
    quantity.innerText = lineItem ? lineItem.quantity.toString() : '0';
    const increaseQuanity = createElement(
      'button',
      ['product-card__increase-quantity', 'quantity-btn'],
      '+',
    ) as HTMLButtonElement;
    const addToCart = createElement('button', ['product-card__add-to-cart', 'button']) as HTMLButtonElement;

    if (!lineItem) {
      addToCart.classList.add('button_green');
      addToCart.innerText = 'add to cart';
      decreaseQuanity.disabled = true;
    } else {
      addToCart.innerText = 'remove from cart';
      decreaseQuanity.disabled = false;
    }

    quantityWrapper.append(decreaseQuanity, quantity, increaseQuanity);
    form.append(quantityWrapper, addToCart);

    return form;
  }
}

export default Card;
