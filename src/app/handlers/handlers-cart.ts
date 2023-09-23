import { changeDiscountCode } from '../api/cart/changeDiscountCode';
import { changeLineItem } from '../api/cart/changeLineItem';
import { promoCodes } from '../components/constants';
import { pages } from '../router/pages';
import Router from '../router/router';

export const changeCartItemQuantityFromCart = (
  target: HTMLElement,
  router: Router,
  action: 'add' | 'decrease' | 'remove' = 'add',
): void => {
  const itemsBtns = document.querySelectorAll<HTMLButtonElement>('button');
  itemsBtns.forEach((btn: HTMLButtonElement): void => {
    if (btn instanceof HTMLButtonElement) btn.disabled = true;
  });
  changeLineItem(target.dataset.id, action, 1).then(() => {
    router.navigate(pages.CART, true);
  });
};

export const applyDiscountCode = async (router: Router): Promise<void> => {
  const discountInput = document.querySelector('.cart-input') as HTMLInputElement;
  const enteredCode = discountInput.value.toUpperCase();
  const errorBlock = document.querySelector('.error-message') as HTMLParagraphElement;
  if (enteredCode) {
    await changeDiscountCode(enteredCode, '', 'add');
    if (!errorBlock.textContent) {
      router.navigate(pages.CART);
    }
  }
};

export const deleteDiscountCode = async (target: HTMLElement, router: Router): Promise<void> => {
  const deletedCode = target.textContent;
  const errorBlock = document.querySelector('.error-message') as HTMLParagraphElement;
  const discountData = promoCodes.find((promo) => {
    return promo.promocode === deletedCode;
  });
  if (discountData) {
    await changeDiscountCode('', discountData.discountID, 'remove');
    if (!errorBlock.textContent) {
      router.navigate(pages.CART);
    }
  }
};
