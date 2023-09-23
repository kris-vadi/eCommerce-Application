import { addUserState } from '../../helpers/utils';
import getCustomerToken from '../../tokens/getCustomerToken';
import { addProfileWarning, removeProfileWarning } from '../../../handlers/handlers-profile';

const customerURL = `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/me/password`;

const getChangePasswordData = (): { version: string; currentPassword: string; newPassword: string } | undefined => {
  const curPassword = document.getElementById('cur-password') as HTMLInputElement;
  const newPassword = document.getElementById('new-password') as HTMLInputElement;
  if (curPassword && newPassword) {
    return {
      version: JSON.parse(localStorage.userState).version,
      currentPassword: curPassword ? curPassword.value : '',
      newPassword: newPassword ? newPassword.value : '',
    };
  }
};

const changeCustomerPassword = async (): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };

  const dataForActions = getChangePasswordData();

  const submitBtn = document.querySelector('.modal-submit') as HTMLButtonElement;
  submitBtn.disabled = true;
  await fetch(`${customerURL}`, { method: 'POST', headers: myHeaders, body: JSON.stringify(dataForActions) })
    .then((res) => {
      if (res.headers.get('content-type') !== 'application/json; charset=utf-8') {
        throw new Error('Incorrect response from the server, please try later');
      }
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else if (res.status == 400) {
        const passwordField = document.getElementById('cur-password');
        passwordField?.classList.add('error-input');
        throw new Error('The given current password does not match.');
      }
    })
    .then(async (res) => {
      submitBtn.disabled = false;
      addUserState(res);
      await getCustomerToken(
        JSON.parse(localStorage.userState).email,
        dataForActions ? dataForActions.newPassword : '',
      );
      addProfileWarning('success', 'Update was successful');
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

export default changeCustomerPassword;
