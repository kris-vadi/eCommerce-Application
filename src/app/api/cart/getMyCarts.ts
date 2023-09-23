import User from '../../components/user';
import { Cart, LineItem } from '../../types/types';

export const getMyCarts = async (): Promise<LineItem[]> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${
      User.isLogged()
        ? JSON.parse(localStorage.token_info).access_token
        : JSON.parse(localStorage.anonymous_token).access_token
    }`,
  };

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  return fetch(
    'https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/me/carts',
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
      if (res.results.length > 0) {
        const activeCart = res.results.find((cart: Cart) => {
          return cart.cartState === 'Active';
        });
        localStorage.setItem('cart', JSON.stringify(activeCart));
      }
      return res.results;
    })
    .catch((error) => {
      if (error) localStorage.setItem('error_get-carts', error.message);
    });
};
