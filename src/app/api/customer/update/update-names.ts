import { pushCurrentAction, addUserState } from '../../helpers/utils';
import { CurrentAction } from '../../../types/types';
import { addProfileWarning, removeProfileWarning } from '../../../handlers/handlers-profile';

const updateCustomerNames = async (newFirstName: string, newLastName: string): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };
  const currentActions: CurrentAction[] = [];
  if (newFirstName) {
    currentActions.push(pushCurrentAction('firstName', 'setFirstName', newFirstName));
  }
  if (newLastName) {
    currentActions.push(pushCurrentAction('lastName', 'setLastName', newLastName));
  }
  const dataForActions = JSON.stringify({
    version: JSON.parse(localStorage.userState).version,
    actions: currentActions,
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
      addProfileWarning('success', `Update was successful!`);
      addUserState(res);
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

export default updateCustomerNames;
