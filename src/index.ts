import './styles/style.scss';
import App from './app/app';
import getAccessToken from './app/api/tokens/getAccessToken';
import getAnonymousToken from './app/api/tokens/getAnonymousToken';
import getAllProducts from './app/api/getProduct/getAllProducts';
import getCategories from './app/api/category/getCategories';
import { hideLoading, showLoadig } from './app/components/utils';
import refreshToken from './app/api/tokens/refreshToken';
import { createMyCart } from './app/api/cart/createMyCart';
import User from './app/components/user';

const loadTokens = async (): Promise<void> => {
  showLoadig();
  if (!localStorage.getItem('token_info') && localStorage.getItem('token_info') !== 'customer') await getAccessToken();
  if (!localStorage.getItem('anonymous_token')) await getAnonymousToken();
  if (!localStorage.getItem('all_products')) await getAllProducts();
  if (localStorage.getItem('anonymous_token')) {
    setInterval(async () => {
      if (!User.isLogged()) {
        await refreshToken(JSON.parse(localStorage.getItem('anonymous_token') as string).refresh_token);
        await createMyCart();
        location.reload();
        alert('Your anonimous session has timed out. Please start shopping again or register.');
      }
    }, 10800000);
  }
  if (!localStorage.getItem('categories')) await getCategories();
};

loadTokens().then(async () => {
  hideLoading();
  const app = new App();
  await app.startApp();
});
