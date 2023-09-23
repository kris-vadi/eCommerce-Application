import UserProfile from '../../app/pages/user-profile';

const userState =
  '{"firstName":"Kate","lastName":"Doe","dateOfBirth":"2000-02-01","email":"AnnFoo@example.com","addresses":[{"id":"f-qUehuy","streetName":"sdc","postalCode":"12332","city":"dcs","country":"US"},{"id":"9dTLPCcB","streetName":"Street","postalCode":"12341","city":"Boston","country":"US"},{"id":"QON4umfn","streetName":"sedsd","postalCode":"12345","city":"eedse","country":"US"},{"id":"hDM9Hxdr","streetName":"desde","postalCode":"21332","city":"dcdsc","country":"US"},{"id":"zCRdRTR1","streetName":"khkq","postalCode":"12345","city":"jkhkg","country":"US"}],"id":"d763003d-face-4362-aec1-14cab59e7da2","version":30,"shippingAddressIds":["zCRdRTR1","hDM9Hxdr","QON4umfn","f-qUehuy"],"billingAddressIds":["9dTLPCcB","f-qUehuy"],"defaultBillingAddressId":"9dTLPCcB","defaultShippingAddressId":"QON4umfn"}';

describe('Class UserProfile: drawProfile function', () => {
  document.body.innerHTML = '';
  localStorage.setItem('userState', userState);
  const profile = new UserProfile();
  document.body.append(profile.drawProfile());
  const profileInfo = document.querySelector('.profile__info');

  it('should create profile page', () => {
    expect(profile).not.toBeNull();
  });

  it('should create ul with all blocks', () => {
    expect(profileInfo).not.toBeNull();
    expect(profileInfo?.children.length).toEqual(6);
  });
});
