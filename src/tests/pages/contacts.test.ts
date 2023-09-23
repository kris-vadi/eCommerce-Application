import Contacts from '../../app/pages/contacts';

describe('Class Contacts: drawContacts function', () => {
  document.body.innerHTML = '';
  document.body.append(new Contacts().drawContacts());
  const contacts = document.querySelector('.contacts');
  const title = document.querySelector('.about-us__title');
  const content = document.querySelector('.about-us__content')?.children;
  const hoursTitle = contacts?.children[3];
  const hours = contacts?.children[4];
  const adressTitle = contacts?.children[5];
  const address = contacts?.children[6];

  it('should create contacts page', () => {
    expect(contacts).not.toBeNull();
  });

  it('should create title', () => {
    expect(title?.innerHTML).toBe(`Contacts`);
  });

  it('should create content', () => {
    expect(content?.length).toEqual(1);
  });

  it('should create correct hours and addresses', () => {
    expect(hoursTitle?.innerHTML).toEqual('Office Hours:');
    expect(hours?.innerHTML).toEqual('Mon-Fri 10am-4pm (GMT) Excl. Bank Holidays');
    expect(adressTitle?.innerHTML).toEqual('Address:');
    expect(address?.innerHTML).toEqual('6 Saryarka avenue, 020000<br>Astana, Kazakhstan');
  });
});
