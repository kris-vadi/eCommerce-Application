import { getRegisterData } from '../../app/api/helpers/getDataFromInput';
import RegPage from '../../app/pages/registration-page';

describe('Check receiving of data from login form', () => {
  document.body.innerHTML = '';
  const regBlock = new RegPage().drawRegPage();
  document.body.append(regBlock);

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

  email.value = 'RandomGirl@example.com';
  password.value = 'Password!2';
  firstName.value = 'Girl';
  lastName.value = 'Random';
  dateOfBirth.value = '2000-03-18';
  salutation.value = 'Mrs';
  areSameAddresses.checked = true;
  billingCountry.value = 'US';
  billingCity.value = 'Boston';
  billingStreet.value = 'Liberty';
  billingPostalCode.value = '12345';
  shippingCountry.value = 'KZ';
  shippingCity.value = 'Shymkent';
  shippingStreet.value = 'Gagarin';
  shippingPostalCode.value = '543211';

  it('should return correct data from register form WITHOUT shipping address', () => {
    const data = getRegisterData();

    expect(data).toEqual({
      email: 'RandomGirl@example.com',
      password: 'Password!2',
      firstName: 'Girl',
      lastName: 'Random',
      dateOfBirth: '2000-03-18',
      salutation: 'Mrs',
      addresses: [
        {
          country: 'US',
          city: 'Boston',
          streetName: 'Liberty',
          postalCode: '12345',
        },
      ],
    });
  });

  it('should return correct data from register form WITH shipping address', () => {
    areSameAddresses.checked = false;

    const data = getRegisterData();

    expect(data).toEqual({
      email: 'RandomGirl@example.com',
      password: 'Password!2',
      firstName: 'Girl',
      lastName: 'Random',
      dateOfBirth: '2000-03-18',
      salutation: 'Mrs',
      addresses: [
        {
          country: 'US',
          city: 'Boston',
          streetName: 'Liberty',
          postalCode: '12345',
        },
        {
          country: 'KZ',
          city: 'Shymkent',
          streetName: 'Gagarin',
          postalCode: '543211',
        },
      ],
    });
  });
});
