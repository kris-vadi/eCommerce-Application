import { Cart, LineItem } from '../types/types';
import { createElement, createInputElement } from '../components/utils';

export default class CartPage {
  public drawCart(): HTMLDivElement {
    const cart: Cart = localStorage.cart ? JSON.parse(localStorage.cart) : '';

    const cartPage = createElement('div', ['cart', 'main__wrapper']) as HTMLDivElement;
    const cartHeader = createElement('div', ['cart__header']);
    const cartTitle = createElement('h3', ['cart__title'], 'Cart');
    const deleteCartBtn = createElement(
      'button',
      ['button', 'button_white_red', 'cart__delete-cart-btn'],
      'Clear Cart',
    );
    cartHeader.append(cartTitle, deleteCartBtn);
    const cartGrid = createElement('div', ['cart__list']) as HTMLDivElement;
    const emptyCartBlock = createElement('div', ['cart__empty', 'cart__hidden']);
    const emptyCartImage = createElement('div', ['cart__empty__img']);
    const emptyCartMessage = createElement(
      'div',
      ['cart__empty__message'],
      '<h4>Your cart is empty...</h4><p>You can visit <a class="cart__link-to-catalog" href="">Catalog</a> to add products to it...</p>',
    );
    emptyCartBlock.append(emptyCartImage, emptyCartMessage);
    let itemsTotalAmount = 0;
    if (cart) {
      const products: LineItem[] = cart.lineItems;
      if (products.length) {
        emptyCartBlock.className = 'cart__empty cart__hidden';
        products.forEach((product, ind) => {
          this.addCartItem(product, ind, cartGrid);
          itemsTotalAmount += product.quantity;
        });

        this.addTotalToCart(cart, cartGrid);
      } else {
        cartHeader.className = 'cart__header cart__hidden';
        emptyCartBlock.className = 'cart__empty';
      }
    } else {
      cartHeader.className = 'cart__header cart__hidden';
      emptyCartBlock.className = 'cart__empty';
    }
    const itemsTotalAmountDisplay = document.querySelector('.header__icon-bascket__count');
    if (itemsTotalAmountDisplay) itemsTotalAmountDisplay.textContent = `${itemsTotalAmount}`;
    const warning = createElement('div', ['cart__warning']);
    cartPage.append(cartHeader, emptyCartBlock, warning, cartGrid);
    return cartPage;
  }

  private addCartItem(lineitem: LineItem, index: number, cartList: HTMLDivElement): void {
    const itemIndex = createElement('div', ['cart__item', 'cart__item__index'], `${index + 1}`);

    const itemImgBlock = createElement('div', ['cart__item', 'cart__item__img-block']);
    const itemImg = createElement('div', ['cart__item__img']);
    itemImg.style.backgroundImage = `url(${lineitem.variant.images[0].url})`;
    itemImgBlock.append(itemImg);

    const itemTitle = createElement('div', ['cart__item', 'cart__item__title'], lineitem.name['en-US']);

    const itemPrice = createElement('div', ['cart__item', 'cart__item__price']);
    const itemTotalPrice = createElement(
      'div',
      ['cart__item', 'cart__item__price'],
      `<p>${(lineitem.totalPrice.centAmount / 100).toFixed(2)}</p>`,
    );
    const fullPrice = createElement('p', [], `${(lineitem.price.value.centAmount / 100).toFixed(2)}`);
    if (lineitem.price.discounted) {
      fullPrice.classList.add('cart__item__price-full');
      const discountPrice = createElement('p', [], `${(lineitem.price.discounted.value.centAmount / 100).toFixed(2)}`);
      const oldTotalPrice = createElement(
        'p',
        ['cart__item__price-full'],
        `${((lineitem.price.value.centAmount / 100) * lineitem.quantity).toFixed(2)}`,
      );
      itemPrice.append(discountPrice);
      itemTotalPrice.append(oldTotalPrice);
    }
    itemPrice.append(fullPrice);

    const itemAmounts = createElement('div', ['cart__item', 'cart__item__amount']);
    const amountBlock = createElement('div', ['cart__item__amount-block']);
    const plusBtn = createElement('button', ['cart__item__btn-plus'], '+');
    plusBtn.id = `plus${lineitem.productId}`;
    const amountTablo = createElement('div', ['cart__item__amount-value'], `${lineitem.quantity}`);
    const minusBtn = createElement('button', ['cart__item__btn-minus'], '-');
    minusBtn.id = `minus${lineitem.id}`;
    const itemDelete = createElement('button', ['cart__item__btn-delete']);
    itemDelete.id = `delete${lineitem.id}`;
    amountBlock.append(minusBtn, amountTablo, plusBtn);
    itemAmounts.append(amountBlock, itemDelete);

    cartList.append(itemIndex, itemImgBlock, itemTitle, itemPrice, itemAmounts, itemTotalPrice);
  }

  private addTotalToCart(cart: Cart, parent: HTMLDivElement): void {
    const emptyBlock = createElement('div', ['cart__item', 'cart__item__empty-left']);
    const totalSumTitle = createElement('div', ['cart__item', 'cart__sum-title'], 'Total sum');
    const totalSum = createElement(
      'div',
      ['cart__item', 'cart__sum'],
      `${(cart.totalPrice.centAmount / 100).toFixed(2)}`,
    );
    parent.append(emptyBlock, totalSumTitle, totalSum);

    const emptyBlock2 = createElement('div', ['cart__item', 'cart__item__empty-left']);
    const discountTitle = createElement('div', ['cart__item', 'cart__discount-title'], 'Discount code');
    const discountCode = createInputElement('text', '', 'cart__discount-code', 'cart', false);
    const btn = createElement('button', ['cart__discont-btn'], 'Input code', { width: 'content' });
    discountCode.className = 'cart__item cart__discount-code';
    discountCode.append(btn);
    const emptyBlock3 = createElement('div', ['cart__item', 'cart__item__empty-discount']);
    const discountSum = createElement('div', ['cart__item', 'cart__discount-sum'], '0.00');
    parent.append(emptyBlock2, discountTitle, discountCode, emptyBlock3, discountSum);

    const emptyBlock4 = createElement('div', ['cart__item', 'cart__item__empty-left']);
    const totalSumWithDiscoutTitle = createElement(
      'div',
      ['cart__item', 'cart__sum-with-discount-title'],
      'Total sum with discount',
    );
    const totalSumWithDiscout = createElement(
      'div',
      ['cart__item', 'cart__sum-with-discount'],
      `${(cart.totalPrice.centAmount / 100).toFixed(2)}`,
    );
    parent.append(emptyBlock4, totalSumWithDiscoutTitle, totalSumWithDiscout);
  }
}
