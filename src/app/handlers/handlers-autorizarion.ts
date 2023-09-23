import createCustomer from '../api/customer/createCustomer';
import { loginCustomer } from '../api/customer/loginCustomer';
import { getLoginData, getRegisterData } from '../api/helpers/getDataFromInput';
import { pages } from '../router/pages';
import Router from '../router/router';
import User from '../components/user';

export const loginViaForm = async (target: HTMLFormElement, router: Router): Promise<void> => {
  const submitBtn = document.querySelector('.auth-btn.submit-login') as HTMLButtonElement;
  const apiStatus = document.querySelector('.api-status') as HTMLParagraphElement;
  const data = getLoginData(target as HTMLFormElement);

  submitBtn.setAttribute('disabled', 'true');
  await loginCustomer(data.username, data.password);

  if (apiStatus.classList.contains('success-status')) {
    setTimeout(() => {
      router.navigate(pages.MAIN);
      User.userLogin();
    }, 1500);
  } else {
    submitBtn.removeAttribute('disabled');
  }
};

export const registerViaForm = async (router: Router): Promise<void> => {
  const submitBtn = document.querySelector('.auth-btn.submit-register') as HTMLButtonElement;
  const apiStatus = document.querySelector('.api-status') as HTMLParagraphElement;
  const data = getRegisterData();
  const defaultBilling = document.getElementById('as-default-billing') as HTMLInputElement;
  const defaultShipping = document.getElementById('as-default-shipping') as HTMLInputElement;
  const checkDefaultBilling = defaultBilling.checked;
  const checkDefaultShipping = defaultShipping.checked;

  submitBtn.setAttribute('disabled', 'true');
  await createCustomer(data, checkDefaultBilling, checkDefaultShipping);

  if (apiStatus.classList.contains('success-status__register')) {
    setTimeout(() => {
      router.navigate(pages.MAIN);
      User.userLogin();
    }, 1500);
  } else {
    submitBtn.removeAttribute('disabled');
  }
};
