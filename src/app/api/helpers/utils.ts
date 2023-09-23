import { catalogQueryParams } from '../../state/state';
import { QueryParam, UserState, CurrentAction, Cart, LineItem } from '../../types/types';

export const addUserState = (customer: UserState): void => {
  const userState: UserState = {
    firstName: customer.firstName,
    lastName: customer.lastName,
    dateOfBirth: customer.dateOfBirth,
    email: customer.email,
    addresses: customer.addresses,
    id: customer.id,
    version: customer.version,
    shippingAddressIds: customer.shippingAddressIds,
    billingAddressIds: customer.billingAddressIds,
    defaultBillingAddressId: customer.defaultBillingAddressId,
    defaultShippingAddressId: customer.defaultShippingAddressId,
  };
  localStorage.setItem('userState', JSON.stringify(userState));
};

export const generateQueryParams = (queryParams?: Map<string, QueryParam> | QueryParam[]): string => {
  let params: QueryParam[] | undefined = [];

  if (queryParams && !Array.isArray(queryParams)) {
    params = Array.from(queryParams.values());
  } else {
    params = queryParams;
  }

  return `&${params?.map((x) => `${x.key}=${x.value}`).join('&')}`;
};

export const addNewQueryParam = (id: string, key: string, value: string): void => {
  const queryParam: QueryParam = {
    key: key,
    value: value,
  };
  catalogQueryParams.set(id, queryParam);
};

export const pushCurrentAction = (dataTitle: string, action: string, data: string | object): CurrentAction => {
  const currentAction = {
    action: action,
    [dataTitle]: data,
  };
  return currentAction;
};

export const addApiStatus = async (
  apiStatus: HTMLParagraphElement,
  className: string,
  errMessage: string,
): Promise<void> => {
  apiStatus.classList.add(className);
  apiStatus.innerHTML = errMessage;
};

export const getLineItemId = (productId: string | undefined, cart: Cart): string | undefined => {
  return cart.lineItems.find((lineItem: LineItem) => lineItem.productId === productId)?.id;
};
