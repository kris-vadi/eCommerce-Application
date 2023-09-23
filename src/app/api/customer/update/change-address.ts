import { addUserState, pushCurrentAction } from '../../helpers/utils';
import { CurrentAction, CurrentActionWithId } from '../../../types/types';
import { addProfileWarning, removeProfileWarning } from '../../../handlers/handlers-profile';

const changeCustomerAddress = async (data: object, type: string, isDefault: boolean): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };

  const address = document.querySelector('.change-address');
  let addressId = '';
  if (address && address instanceof HTMLElement && address.dataset.id) {
    addressId = address.dataset.id;
  }

  const curActions: [CurrentAction | CurrentActionWithId] = [
    {
      action: 'changeAddress',
      addressId: addressId,
      address: data,
    },
  ];

  if (isDefault) {
    const defaultAction = type === 'Billing' ? 'setDefaultBillingAddress' : 'setDefaultShippingAddress';
    curActions.push(pushCurrentAction('addressId', defaultAction, `${addressId}`));
  }

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

export default changeCustomerAddress;
