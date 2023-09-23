import { changeLineItem } from '../api/cart/changeLineItem';
import { createMyCart } from '../api/cart/createMyCart';
import getAllProducts from '../api/getProduct/getAllProducts';
import getProductsBySearch from '../api/getProduct/getProductsBySearch';
import { addNewQueryParam } from '../api/helpers/utils';
import Catalog from '../pages/catalog';
import { pages } from '../router/pages';
import Router from '../router/router';
import {
  catalogQueryParams,
  productAgeSelectedIds,
  productGendersSelectedIds,
  productLimit,
  productTypesSelectedIds,
} from '../state/state';
import { sorterParametrs } from '../components/constants';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import { encodeText } from '../components/utils';

export const toggleCatalogAddProductButton = async (target: HTMLElement): Promise<void> => {
  if (!localStorage.cart) await createMyCart();
  const addButton = target.closest('.product__buttons') as HTMLDivElement;
  const id = addButton.parentElement ? addButton.parentElement.id : '';
  const buttonText = addButton.querySelector('.product__add-text') as HTMLSpanElement;
  const buttonIcon = addButton.querySelector('.product__add-button') as HTMLSpanElement;

  if (buttonText.innerText === 'add to cart') {
    await changeLineItem(id, 'add', 1);
    addButton.classList.remove('product__buttons_active');
    buttonText.innerText = '';
    buttonIcon.innerText = '✓';
    Header.addProductsNumberInBasket();
  }
};

export const deleteSortFromQueryParam = (): void => {
  Object.keys(sorterParametrs).forEach((key: string) => {
    catalogQueryParams.delete(key);
  });
};

export const redrawProducts = async (): Promise<void> => {
  await getAllProducts();
  await Catalog.drawProducts();
};

export const addFilterNavigationForCheckbox = async (currentTarget: HTMLInputElement): Promise<void> => {
  productLimit.limit = 12;
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
    await redrawProducts();
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
    await redrawProducts();
  }
};

export const addFilterNavigationForSelect = async (currentTarget: HTMLSelectElement): Promise<void> => {
  switch (currentTarget.value) {
    case 'name-asc':
      deleteSortFromQueryParam();
      addNewQueryParam(currentTarget.value, 'sort', `masterData.current.name.en-US%20asc`);
      await redrawProducts();
      break;
    case 'name-desc':
      deleteSortFromQueryParam();
      addNewQueryParam(currentTarget.value, 'sort', `masterData.current.name.en-US%20desc`);
      await redrawProducts();
      break;
    case 'price-asc':
      deleteSortFromQueryParam();
      addNewQueryParam(currentTarget.value, 'sort', `key%20asc`);
      await redrawProducts();
      break;
    case 'price-desc':
      deleteSortFromQueryParam();
      addNewQueryParam(currentTarget.value, 'sort', `key%20desc`);
      await redrawProducts();
      break;
    default:
      localStorage.removeItem('sorted_products');
      deleteSortFromQueryParam();
      await redrawProducts();
      break;
  }
};

export const addFilterNavigationForSearch = async (currentTarget: HTMLInputElement): Promise<void> => {
  productLimit.limit = 12;
  const close = document.querySelector('.filters__close_search') as HTMLParagraphElement;
  close.classList.remove('filters__close_hidden');
  if (currentTarget.value.length === 0) {
    localStorage.removeItem('search_products');
    await Catalog.drawProducts();
    close.classList.add('filters__close_hidden');
  } else {
    await getProductsBySearch(encodeText(currentTarget.value)).then(() => {
      Catalog.drawProducts();
    });
  }
};

export const clearFilterForSearch = async (): Promise<void> => {
  productLimit.limit = 12;
  const close = document.querySelector('.filters__close_search') as HTMLParagraphElement;
  const search = document.querySelector('.filters__search') as HTMLInputElement;
  search.value = '';
  localStorage.removeItem('search_products');
  close.classList.add('filters__close_hidden');
  await redrawProducts();
};

export const addFilterNavigationForPrices = async (): Promise<void> => {
  productLimit.limit = 12;
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
  await redrawProducts();
};

export const clearFilterForPrices = async (): Promise<void> => {
  const from = document.getElementById('price-from') as HTMLInputElement;
  const to = document.getElementById('price-to') as HTMLInputElement;
  from.value = '';
  to.value = '';
  catalogQueryParams.delete('price');
  productLimit.limit = 12;
  await redrawProducts();
};

export const addNavigationForSidebar = async (
  currentTarget: HTMLElement,
  router: Router,
  sidebar: Sidebar,
): Promise<void> => {
  Catalog.clearSortedProducts();
  if (currentTarget.dataset.page !== 'catalog') {
    addNewQueryParam('sidebar', 'where', `masterData%28current%28categories%28id%3D%22${currentTarget.id}%22%29%29%29`);
  }

  productLimit.limit = 12;
  await getAllProducts();

  sidebar.closeSidebar();
  if (currentTarget.dataset.page === 'catalog') {
    router.navigate(pages.CATALOG);
  } else {
    router.navigate(`${pages.CATALOG}/${currentTarget.dataset.page}`);
  }
};

export const loadMoreProducts = async (target: HTMLElement): Promise<void> => {
  const currentTarget = target as HTMLButtonElement;

  productLimit.limit += 12;

  currentTarget.disabled = true;
  await redrawProducts();
};
