import { createElement, nullUserState } from '../components/utils';
import { UserState } from '../types/types';

class UserProfile {
  public drawProfile(): HTMLDivElement {
    const userState: UserState = localStorage.getItem('userState')
      ? JSON.parse(localStorage.getItem('userState') as string)
      : nullUserState;
    const profile = createElement('div', ['profile', 'main__wrapper']) as HTMLDivElement;
    const title = createElement(
      'div',
      ['profile__title'],
      `
    <h5>Welcome back,</h5>
    <h4>${userState.firstName} ${userState.lastName}</h4>`,
    ) as HTMLDivElement;
    const birthday = createElement('div', ['profile__birthday'], `${userState.dateOfBirth}`) as HTMLDivElement;
    const addresses = createElement('div', ['profile__addreses']) as HTMLDivElement;

    addresses.append(this.addAddress('billing'), this.addAddress('shipping'));

    profile.append(title, birthday, addresses);
    return profile;
  }

  private addAddress(addressClass: string): HTMLDivElement {
    const address = createElement(
      'div',
      ['profile__address', `${addressClass}`],
      `
    `,
    ) as HTMLDivElement;

    return address;
  }
}

export default UserProfile;
