import { RegisterData } from '../../types/types';

export const getLoginData = (form: HTMLFormElement): { username: string; password: string } => {
  const { elements } = form;
  const data = Array.from(elements)
    .filter((item) => {
      if (item instanceof HTMLInputElement) {
        return !!item.name;
      }
    })
    .map((element) => {
      if (element instanceof HTMLInputElement) {
        const { name, value } = element;
        return { name, value };
      }
    });

  const username = data[0]?.value;
  const password = data[1]?.value;

  if (username && password) {
    return { username: username, password: password };
  } else {
    return { username: '', password: '' };
  }
};

export const getRegisterData = (): RegisterData => {
  const email = document.getElementById('email') as HTMLInputElement;
  const password = document.getElementById('password') as HTMLInputElement;
  const firstName = document.getElementById('firstName') as HTMLInputElement;
  const lastName = document.getElementById('lastName') as HTMLInputElement;
  const dateOfBirth = document.getElementById('dateOfBirth') as HTMLInputElement;
  const salutation = document.getElementById('salutation') as HTMLInputElement;
  const areSameAddresses = document.getElementById('are-same-addresses') as HTMLInputElement;
  const billingCountry = document.getElementById('billing-country') as HTMLInputElement;
  const billingCity = document.getElementById('billing-city') as HTMLInputElement;
  const billingStreet = document.getElementById('billing-streetName') as HTMLInputElement;
  const billingPostalCode = document.getElementById('billing-postalCode') as HTMLInputElement;
  const shippingCountry = document.getElementById('shipping-country') as HTMLInputElement;
  const shippingCity = document.getElementById('shipping-city') as HTMLInputElement;
  const shippingStreet = document.getElementById('shipping-streetName') as HTMLInputElement;
  const shippingPostalCode = document.getElementById('shipping-postalCode') as HTMLInputElement;

  const data = {
    email: email.value,
    password: password.value,
    firstName: firstName.value,
    lastName: lastName.value,
    dateOfBirth: dateOfBirth.value,
    salutation: salutation.value,
    addresses: [
      {
        country: billingCountry.value,
        city: billingCity.value,
        streetName: billingStreet.value,
        postalCode: billingPostalCode.value,
      },
    ],
  };

  if (!areSameAddresses.checked) {
    data.addresses.push({
      country: shippingCountry.value,
      city: shippingCity.value,
      streetName: shippingStreet.value,
      postalCode: shippingPostalCode.value,
    });
  }

  return data;
};
