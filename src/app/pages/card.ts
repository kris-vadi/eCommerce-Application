import { createElement, createImageElement } from '../components/utils';
import { Product, Price } from '../types/types';

class Card {
  data: Product;

  constructor() {
    this.data = JSON.parse(localStorage.getItem('currentProduct-data')!);
  }

  public drawCard(): HTMLDivElement {
    const wrapper = createElement('div', ['product-card', 'main__wrapper'], '', {
      'data-slideIndex': '1',
    }) as HTMLDivElement;
    const slider = this.drawSlider(this.data);
    const modal = this.drawModal(this.data);
    const info = createElement('div', ['product-card__info']) as HTMLDivElement;
    const heading = createElement(
      'h2',
      ['product-card__heading'],
      this.data.masterData.current.name['en-US'],
    ) as HTMLElement;
    const priceWrapper = this.drawPriceWrapper(this.data);
    const form = this.drawCartForm();
    const smallHeading = createElement('h4', ['product-card__detail-heading'], 'Details') as HTMLElement;
    const details = createElement(
      'p',
      ['product-card__details'],
      this.data.masterData.current.description['en-US'],
    ) as HTMLParagraphElement;

    info.append(heading, priceWrapper, form, smallHeading, details);
    wrapper.append(modal, slider, info);

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
    priceWrapper.append(discountedPrice, fullPrice);
    data.masterData.current.masterVariant.prices.forEach((price: Price): void => {
      if (price.country === 'US') {
        if (price.discounted) {
          discountedPrice.innerHTML = `${(
            price.discounted.value.centAmount /
            10 ** price.discounted.value.fractionDigits
          ).toFixed(2)}${price.value.currencyCode}`;
          fullPrice.classList.add('product-card__old-price');
        }
        fullPrice.innerHTML = `${(price.value.centAmount / 10 ** price.value.fractionDigits).toFixed(2)}${
          price.value.currencyCode
        }`;
      }
    });

    return priceWrapper;
  }

  private drawCartForm(): HTMLFormElement {
    const form = createElement('form', ['product-card__form']) as HTMLFormElement;
    const quantityWrapper = createElement('div', ['product-card__quantity-wrapper']) as HTMLDivElement;
    const decreaseQuanity = createElement(
      'button',
      ['product-card__decrease-quantity', 'quantity-btn'],
      '-',
    ) as HTMLButtonElement;
    const quantity = createElement('input', ['product-card__quantity']) as HTMLInputElement;
    quantity.type = 'number';
    quantity.placeholder = '1';
    quantity.min = '0';
    quantity.value = '1';
    const increaseQuanity = createElement(
      'button',
      ['product-card__decrease-quantity', 'quantity-btn'],
      '+',
    ) as HTMLButtonElement;
    const addToCart = createElement(
      'button',
      ['product-card__add-to-cart', 'button', 'button_green'],
      'Add to cart',
    ) as HTMLButtonElement;

    quantityWrapper.append(decreaseQuanity, quantity, increaseQuanity);
    form.append(quantityWrapper, addToCart);

    return form;
  }
}

export default Card;
