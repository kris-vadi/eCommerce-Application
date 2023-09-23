import Header from '../../components/header';
import { getMyCarts } from '../cart/getMyCarts';
import getCustomerToken from '../tokens/getCustomerToken';
import { getAllCustomersEmails } from './getAllCustomers';
import { fillUserState } from './getCustomerByID';

const signinURL = `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/me/login`;

const incorrectResponseText = 'Incorrect response from the server, please try later';
const notExistEmailText = `The email address doesn't exist, please enter correct one or register`;
const incorrectPassText = `The password you entered is incorrect, please try again`;

export const loginCustomer = async (username: string, password: string): Promise<void> => {
  const signinHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.anonymous_token).access_token}`,
  };

  const requestOptions = {
    method: 'POST',
    headers: signinHeaders,
    body: JSON.stringify({
      email: `${username}`,
      password: `${password}`,
      activeCartSignInMode: 'MergeWithExistingCustomerCart',
    }),
  };

  const apiStatus = document.querySelector('.api-status') as HTMLParagraphElement;
  const emailInput = document.querySelector('#email') as HTMLInputElement;
  const passwordInput = document.querySelector('#password') as HTMLInputElement;

  await fetch(signinURL, requestOptions)
    .then(async (res) => {
      if (res.headers.get('content-type') !== 'application/json; charset=utf-8') {
        throw new Error(incorrectResponseText);
      }
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        const existedEmails = (await getAllCustomersEmails()) as string[];
        switch (res.status) {
          case 400:
            if (existedEmails.indexOf(username) === -1) {
              throw new Error(notExistEmailText);
            } else {
              throw new Error(incorrectPassText);
            }
          default:
            throw new Error(`The error with status code ${res.status} has occured, please try later`);
        }
      }
    })
    .then(async () => {
      await fillUserState(username);
      await getCustomerToken(username, password);
      await getMyCarts();
      Header.addProductsNumberInBasket();
      apiStatus.classList.add('success-status');
      apiStatus.innerHTML = `Enjoy the shopping!`;
    })
    .catch((err) => {
      if (err instanceof Error) {
        apiStatus.classList.add('error-status');
        apiStatus.innerHTML = `${err.message}`;

        if (apiStatus.innerHTML === notExistEmailText) {
          emailInput.classList.add('error-input');
        } else if (apiStatus.innerHTML === incorrectPassText) {
          passwordInput.classList.add('error-input');
        }
      }
    });
};

export const loginAfterRegistration = async (username: string, password: string): Promise<void> => {
  const signinHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.anonymous_token).access_token}`,
  };

  const requestOptions = {
    method: 'POST',
    headers: signinHeaders,
    body: JSON.stringify({
      email: `${username}`,
      password: `${password}`,
    }),
  };

  await fetch(signinURL, requestOptions)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        throw new Error(`The error with status code ${res.status} has occured, please try later`);
      }
    })
    .then(async () => {
      await getCustomerToken(username, password);
    });
};
