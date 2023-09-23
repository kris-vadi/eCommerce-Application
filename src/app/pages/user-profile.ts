import { createElement, createInputElement, nullUserState } from '../components/utils';
import { UserState } from '../types/types';
import RegPage from '../pages/registration-page';
import { drawCurrentAddresses } from '../handlers/handlers-profile';

class UserProfile extends RegPage {
  public drawProfile(): HTMLDivElement {
    const userState: UserState = localStorage.getItem('userState')
      ? JSON.parse(localStorage.getItem('userState') as string)
      : nullUserState;
    const profile = createElement('div', ['profile', 'main__wrapper']) as HTMLDivElement;
    const info = createElement('ul', ['profile__info']) as HTMLUListElement;

    const name = this.addProfileItem(
      'name',
      `<div class="profile__name"><p>First name, Last name</p><p id='nameInfo' class="main__green-text">${userState.firstName} ${userState.lastName}</p></div>`,
      this.addnameBlock('First name', 'Last name'),
    );

    const birthday = this.addProfileItem(
      'birthday',
      `<div><p>Date of birth:</p><p id='birthdayInfo' class='main__green-text'>${userState.dateOfBirth}</p></div>`,
      createInputElement('date', 'Date of birth', 'dateOfBirth', 'auth', true, { name: 'dateOfBirth' }),
    );

    info.append(name, birthday);

    const billingAddresses = this.addAddressTypeItem('Billing');
    const shippingAddresses = this.addAddressTypeItem('Shipping');
    info.append(billingAddresses, shippingAddresses);

    const emailComponents = [
      createElement('div', [], `<p id='curEmailInfo'>Your current E-mail: <i>${userState.email}</i></p>`),
      this.addEmail('Input your new E-mail'),
    ];

    const email = this.addModal('e-mail', emailComponents);

    const passwordComponents = [
      this.addPassword('current-password', 'cur-password', 'Input your current password'),
      this.addPassword('new-password', 'new-password', 'Input your new password'),
      this.addPassword('new-password', 'new-password-check', 'Confirm your new password'),
    ];

    const password = this.addModal('password', passwordComponents);

    info.append(email, password);

    const editBtn = createElement('button', ['button', 'button_green', 'profile__edit-btn'], 'Edit profile');
    const warning = createElement('div', ['profile__warning']);
    profile.append(editBtn, warning, info);
    return profile;
  }

  private addProfileItem(itemName: string, label?: string, data?: HTMLElement, btn: boolean = true): HTMLLIElement {
    const item = createElement('li', ['profile__item', 'profile__item_inline'], label) as HTMLLIElement;
    item.id = `${itemName}`;
    if (data) {
      const itemContent = createElement('div', ['profile__content', 'profile__content_hidden']) as HTMLDivElement;
      itemContent.append(data);
      itemContent.dataset.content = `${item.id}`;
      if (btn) {
        itemContent.append(
          createElement(
            'button',
            ['button', 'button_white', 'profile__update', 'profile__content_hidden'],
            'Save changes',
          ),
        );
      }
      item.append(itemContent);
    }
    return item;
  }

  private addAddressTypeItem(type: string): HTMLLIElement {
    const item = createElement(
      'li',
      ['profile__item', 'profile__item_inline'],
      `<p class='profile__address__title'>${type} addresses</p>`,
    ) as HTMLLIElement;
    item.id = `${type}-address`;
    const curAddresses = createElement('div', ['profile__addresses__current']) as HTMLDivElement;
    drawCurrentAddresses(type, curAddresses);

    const itemContent = createElement('div', ['profile__content', 'profile__content_hidden']) as HTMLDivElement;
    const addressForm = createElement('form', ['profile__address__form']);
    const addressTemplate = this.drawAddressBlock(type);
    const saveBtn = createElement(
      'button',
      ['button', 'button_white', 'profile__update', 'profile__content_hidden'],
      'Save address',
    );
    const btnBlock = createElement('div', ['profile__address__btn-block']);

    btnBlock.append(saveBtn);
    addressForm.append(addressTemplate, btnBlock);
    itemContent.append(addressForm);
    itemContent.dataset.content = `${item.id}`;
    item.append(curAddresses, itemContent);
    return item;
  }

  private addModal(title: string, components: HTMLElement[]): HTMLLIElement {
    const modalBg = createElement('div', ['profile__modal__bg']) as HTMLDivElement;
    const modal = createElement('div', ['profile__modal'], `<h4>Change ${title}</h4>`) as HTMLDivElement;
    const modalForm = createElement('form', [
      'auth-form',
      'profile__modal__form',
      `profile__${title}__form`,
    ]) as HTMLFormElement;
    modalBg.append(modal);
    modal.append(modalForm);

    const currentEmail = this.addEmail('Your current E-mail', `${title}__cur-email`);
    currentEmail.classList.add('profile__email__current');
    const btnBlock = createElement('div', ['profile__modal__btn-block']);
    const cancelBtn = createElement('button', ['button', 'modal-cancel'], `Cancel`);
    const submitBtn = createElement('button', ['button', 'button_green', 'modal-submit'], `Change ${title}`);
    btnBlock.append(cancelBtn, submitBtn);

    modalForm.append(currentEmail, ...components, btnBlock);
    const itemTitle = title[0].toUpperCase() + title.slice(1);
    const item = this.addProfileItem(`change-${title}`, itemTitle, modalBg, false);
    item.className = 'profile__item profile__item_modal';
    return item;
  }
}

export default UserProfile;
