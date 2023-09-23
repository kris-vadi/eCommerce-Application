import { addUserState, pushCurrentAction } from '../../helpers/utils';
import { addProfileWarning, removeProfileWarning } from '../../../handlers/handlers-profile';
import { Address } from '../../../types/types';

const addCustomerAddress = async (data: object, type: string, isDefault: boolean): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };
  const dataForActions = JSON.stringify({
    version: JSON.parse(localStorage.userState).version,
    actions: [
      {
        action: 'addAddress',
        address: data,
      },
    ],
  });
  const curAddresses: Address[] = JSON.parse(localStorage.userState).addresses;
  const ids: string[] = [];
  curAddresses.forEach((address) => (address.id ? ids.push(address.id) : ''));

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
      const newAddresses: Address[] = res.addresses;
      const newIds: string[] = [];
      newAddresses.forEach((address) => (address.id ? newIds.push(address.id) : ''));
      let newId;
      if (newIds) {
        newId = newIds.filter((id) => !ids.includes(id))[0];
      }
      const action = type === 'Billing' ? 'addBillingAddressId' : 'addShippingAddressId';
      const currentActions = [pushCurrentAction('addressId', action, `${newId}`)];
      if (isDefault) {
        const defaultAction = type === 'Billing' ? 'setDefaultBillingAddress' : 'setDefaultShippingAddress';
        currentActions.push(pushCurrentAction('addressId', defaultAction, `${newId}`));
      }
      const newDataForActions = JSON.stringify({
        version: res.version,
        actions: currentActions,
      });
      await fetch(`${customerURL}`, { method: 'POST', headers: myHeaders, body: newDataForActions })
        .then(async (response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          }
        })
        .then(async (result) => {
          addUserState(result);
          addProfileWarning('success', `Update was successful!`);
          setTimeout(() => {
            removeProfileWarning();
          }, 3000);
        });
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

export default addCustomerAddress;
