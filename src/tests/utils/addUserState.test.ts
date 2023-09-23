import { addUserState } from '../../app/api/helpers/utils';

describe('addUserState function', () => {
  const firstCustomer = JSON.parse(
    '{"firstName":"Ann","lastName":"Foo","dateOfBirth":"2000-04-01","email":"annfoo@example.com","addresses":[{"id":"f-qUehuy","streetName":"streetname","postalCode":"12345","city":"Boston","country":"US"}],"id":"d763003d-face-4362-aec1-14cab59e7da2","shippingAddressIds":["f-qUehuy"],"billingAddressIds":["f-qUehuy"],"defaultBillingAddressId":"f-qUehuy","defaultShippingAddressId":"f-qUehuy"}',
  );
  const secondCustomer = JSON.parse(
    '{"firstName":"John","lastName":"Doe","dateOfBirth":"2004-04-14","email":"johnDoe@example.com","addresses":[{"id":"aaaaa","streetName":"streetname","postalCode":"12345","city":"Boston","country":"US"}],"id":"a363003d-face-4362-aec1-14cab59e7da2","shippingAddressIds":["aaaaa"],"billingAddressIds":["aaaaa"],"defaultBillingAddressId":"aaaaa","defaultShippingAddressId":"aaaaa"}',
  );
  addUserState(firstCustomer);
  addUserState(secondCustomer);

  it('should set correct value in localStorage', () => {
    expect(localStorage.getItem('userState')).toEqual(
      '{"firstName":"John","lastName":"Doe","dateOfBirth":"2004-04-14","email":"johnDoe@example.com","addresses":[{"id":"aaaaa","streetName":"streetname","postalCode":"12345","city":"Boston","country":"US"}],"id":"a363003d-face-4362-aec1-14cab59e7da2","shippingAddressIds":["aaaaa"],"billingAddressIds":["aaaaa"],"defaultBillingAddressId":"aaaaa","defaultShippingAddressId":"aaaaa"}',
    );
    expect(localStorage.getItem('userState')).toEqual(
      '{"firstName":"John","lastName":"Doe","dateOfBirth":"2004-04-14","email":"johnDoe@example.com","addresses":[{"id":"aaaaa","streetName":"streetname","postalCode":"12345","city":"Boston","country":"US"}],"id":"a363003d-face-4362-aec1-14cab59e7da2","shippingAddressIds":["aaaaa"],"billingAddressIds":["aaaaa"],"defaultBillingAddressId":"aaaaa","defaultShippingAddressId":"aaaaa"}',
    );
  });
});
