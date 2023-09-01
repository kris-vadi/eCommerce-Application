import Filters from '../components/filters';
import { createElement } from '../components/utils';
import { catalogQueryParams } from '../state/state';
import { Price, Product } from '../types/types';

class Catalog {
  constructor() {
    localStorage.removeItem('sorted_products');
    localStorage.removeItem('search_products');
    catalogQueryParams.clear();
  }

  public drawCatalog(): HTMLDivElement {
    const catalog = createElement('div', ['catalog', 'main__wrapper']) as HTMLDivElement;
    const title = createElement('div', ['catalog__title'], '<h2>Catalog</h2>') as HTMLDivElement;
    const content = createElement('div', ['catalog__content']) as HTMLDivElement;
    const products = createElement('div', ['catalog__products']) as HTMLDivElement;
    const mobileFiltersButton = createElement('div', ['mobile-filters__item'], 'Filters') as HTMLDivElement;
    const filters = this.drawFilters();

    content.append(mobileFiltersButton, filters, products);
    catalog.append(title, content);

    return catalog;
  }

  private drawFilters(): HTMLDivElement {
    const filters = new Filters();

    return filters.drawFilters();
  }

  static drawProducts(): void {
    const products = document.querySelector('.catalog__products') as HTMLDivElement;
    products.innerHTML = '';
    let currentProducts: Product[] = [];
    let searchProducts: Product[] = [];

    if (
      localStorage.getItem('sorted_products') &&
      JSON.parse(localStorage.getItem('sorted_products') as string).length > 0
    ) {
      currentProducts = JSON.parse(localStorage.getItem('sorted_products') as string);
    } else if (catalogQueryParams.size > 0) {
      currentProducts = JSON.parse(localStorage.getItem('sorted_products') as string);
    } else {
      currentProducts = JSON.parse(localStorage.getItem('all_products') as string);
    }

    if (localStorage.getItem('search_products') !== null) {
      searchProducts = JSON.parse(localStorage.getItem('search_products') as string);
      const searchProductsIds: string[] = [];

      searchProducts.forEach((product: Product): void => {
        searchProductsIds.push(product.id);
      });

      currentProducts = currentProducts.filter((product: Product): boolean => searchProductsIds.includes(product.id));
    }

    if (currentProducts.length > 0) {
      currentProducts.forEach((product: Product): void => {
        const productBlock = this.drawProduct(product);
        products.append(productBlock);
      });
    } else {
      products.innerHTML = 'Sorry, no products matched your selection.';
    }
  }

  static drawProduct(product: Product): HTMLDivElement {
    const productBlock = createElement('div', ['catalog__product', 'product']) as HTMLDivElement;
    const img = createElement('img', ['product__img']) as HTMLImageElement;
    const url: string = product.masterData.current.masterVariant.images[0].url;
    if (url) img.src = url;
    const name = createElement(
      'div',
      ['product__name'],
      `${product.masterData.current.name['en-US']}`,
    ) as HTMLDivElement;
    const description = createElement(
      'div',
      ['catalog__description'],
      `${product.masterData.current.description['en-US'].slice(0, 45)}...`,
    ) as HTMLDivElement;
    const prices = this.drawPrices(product);

    productBlock.id = product.id;

    productBlock.append(img, name, description, prices);
    return productBlock;
  }

  static drawPrices(product: Product): HTMLDivElement {
    const prices = createElement('div', ['product__prices']) as HTMLDivElement;
    const priceValue = createElement('span', ['product__price']) as HTMLSpanElement;
    const discountValue = createElement('span', ['product__discount']) as HTMLSpanElement;
    let value: string;
    let discount: string;

    product.masterData.current.masterVariant.prices.forEach((price: Price): void => {
      if (price.country === 'US') {
        value = price.value.centAmount
          ? (price.value.centAmount / 10 ** price.value.fractionDigits).toFixed(2)
          : '0.00';
        priceValue.innerText = `${value} ${price.value.currencyCode}`;

        if (price.discounted) {
          discount = (price.discounted.value.centAmount / 10 ** price.discounted.value.fractionDigits).toFixed(2);
          priceValue.classList.add('product__price_crossed-out');
          discountValue.innerText = `${discount}`;
          prices.append(discountValue);
        }
      }
    });

    prices.append(priceValue);

    return prices;
  }
}

export default Catalog;
