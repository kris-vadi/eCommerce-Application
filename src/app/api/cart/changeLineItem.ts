import User from '../../components/user';
import { showWarning } from '../../handlers/handlers-profile';
import { Cart } from '../../types/types';
import { getLineItemId } from '../helpers/utils';

export const changeLineItem = async (
  productId: string | undefined,
  action: 'add' | 'decrease' | 'remove' = 'add',
  quantity?: number,
): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',

    Authorization: `Bearer ${
      User.isLogged()
        ? JSON.parse(localStorage.token_info).access_token
        : JSON.parse(localStorage.anonymous_token).access_token
    }`,
  };

  const cart: Cart = JSON.parse(localStorage.cart);
  const currentBody: { version: number; actions: object[] } = {
    version: cart ? cart.version : 1,
    actions: [],
  };

  if (action === 'add') {
    currentBody.actions.push({
      action: 'addLineItem',
      productId: `${productId}`,
      variantId: 1,
      quantity: quantity,
      externalTaxRate: 'bf2a4dc1-dd08-4b29-9b16-efbd7b905a42',
    });
  } else if (action === 'decrease') {
    currentBody.actions.push({
      action: 'removeLineItem',
      lineItemId: `${getLineItemId(productId, cart)}`,
      quantity: quantity,
    });
  } else if (action === 'remove') {
    currentBody.actions.push({
      action: 'removeLineItem',
      lineItemId: `${getLineItemId(productId, cart)}`,
    });
  }

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(currentBody),
  };

  await fetch(
    `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/me/carts/${cart.id}`,
    requestOptions,
  )
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        throw new Error(`The error with status code ${res.status} has occured, please try later`);
      }
    })
    .then((res) => {
      localStorage.setItem('cart', JSON.stringify(res));
    })
    .catch((err) => {
      if (err instanceof Error) {
        showWarning('error', err.message, 'cart');
      }
    });
};
