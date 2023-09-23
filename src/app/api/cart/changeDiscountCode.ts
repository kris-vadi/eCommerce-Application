import User from '../../components/user';

export const changeDiscountCode = async (
  code?: string,
  discountID?: string,
  action: 'add' | 'remove' = 'add',
): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${
      User.isLogged()
        ? JSON.parse(localStorage.token_info).access_token
        : JSON.parse(localStorage.anonymous_token).access_token
    }`,
  };

  const cart = JSON.parse(localStorage.cart);
  const currentBody: { version: number; actions: object[] } = {
    version: cart ? cart.version : 1,
    actions: [],
  };

  if (action === 'add') {
    currentBody.actions.push({
      action: 'addDiscountCode',
      code: code,
    });
  } else {
    currentBody.actions.push({
      action: 'removeDiscountCode',
      discountCode: {
        typeId: 'discount-code',
        id: discountID,
      },
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
      const discountInput = document.querySelector('.cart-input') as HTMLInputElement;
      const actualCode = document.querySelector('.cart__delete-discont') as HTMLButtonElement;
      const applyBtn = document.querySelector('.cart__discont-btn') as HTMLButtonElement;

      if (action === 'add') {
        discountInput.value = '';
        actualCode.textContent = code as string;
        actualCode.style.display = 'block';
        applyBtn.style.display = 'none';
      } else {
        actualCode.style.display = 'none';
        applyBtn.style.display = 'block';
      }
      localStorage.setItem('cart', JSON.stringify(res));
    })
    .catch((err) => {
      if (err instanceof Error) {
        const errorBlock = document.querySelector('.error-message') as HTMLParagraphElement;
        errorBlock.classList.add('incorrect-code');
        if (action === 'add') {
          errorBlock.textContent = 'Incorrect code';
        } else {
          errorBlock.textContent = 'Try again';
        }
        setTimeout(() => {
          errorBlock.textContent = '';
        }, 2000);
      }
    });
};
