import { addUserState } from '../../helpers/utils';
import { addProfileWarning, removeProfileWarning } from '../../../handlers/handlers-profile';

const makeAddressDefault = async (target: HTMLElement, type: string): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };

  const addressItem = target.closest('.profile__address') as HTMLLIElement;
  let addressId = '';
  if (addressItem && addressItem instanceof HTMLElement && addressItem.dataset.id) {
    addressId = addressItem.dataset.id;
  }
  const action = type === 'Billing' ? 'setDefaultBillingAddress' : 'setDefaultShippingAddress';
  const curActions = [
    {
      action: action,
      addressId: addressId,
    },
  ];

  const dataForActions = JSON.stringify({
    version: JSON.parse(localStorage.userState).version,
    actions: curActions,
  });

  const customerId = JSON.parse(localStorage.userState).id;
  const customerURL = `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/customers/${customerId}`;

  await fetch(`${customerURL}`, { method: 'POST', headers: myHeaders, body: dataForActions })
    .then((res) => {
      if (res.headers.get('content-type') !== 'application/json; charset=utf-8') {
        const error = new Error('Incorrect response from the server, please try later');
        throw error;
      }
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        throw new Error(`The error with status code ${res.status} has occured, please try later`);
      }
    })
    .then(async (res) => {
      addUserState(res);
      addProfileWarning('success', `Update was successful!`);
      setTimeout(() => {
        removeProfileWarning();
      }, 3000);
    })
    .catch((err) => {
      if (err instanceof Error) {
        addProfileWarning('error', err.message);
        setTimeout(() => {
          removeProfileWarning();
        }, 3000);
      }
    });
};

export default makeAddressDefault;
