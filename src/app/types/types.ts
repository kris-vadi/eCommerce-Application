export interface RouteInfo {
  path: string;
  callback: (id?: string) => void;
}

export interface UrlInfo {
  pathname: string;
  id: string;
}

export interface ValidTemplates {
  firstName: [RegExp, string];
  lastName: [RegExp, string];
  streetName: [RegExp, string];
  city: [RegExp, string];
}

export interface Address {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
  id?: string;
}

export interface AddressFromAPI {
  [key: string]: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  salutation: string;
  addresses: Address[];
}

export interface UserState {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  addresses: Address[];
  id: string;
  billingAddressIds: string[];
  shippingAddressIds: string[];
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
}

export interface CurrentAction {
  action: string;
  addressId: string;
}

export interface CardData {
  title: string;
  images: { dimensions: { w: number; h: number }; url: string }[];
  prices: {
    value: string;
    discounted: string;
    currency: string;
  };
  details: string;
}

export interface Product {
  id: string;
  productType: ProductTypeReference;
  masterData: ProductCatalogData;
}

export interface ProductTypeReference {
  id: string;
  typeId: string;
  version: number;
  versionModifiedAt: string;
}

export interface ProductCatalogData {
  current: ProductData;
}

export interface ProductData {
  name: LocalizedString;
  categories: CategoryReference[];
  description: LocalizedString;
  slug: string;
  masterVariant: ProductVariant;
  variants: ProductVariant[];
}

export type LocalizedString = {
  'en-US': string;
  'ru-KZ': string;
};

export interface CategoryReference {
  id: string;
  typeId: string;
}

export interface ProductVariant {
  id: number;
  key: string;
  sku: string;
  prices: Price[];
  price: Price;
  images: Image[];
}

export interface Price {
  country: string;
  id: string;
  key: string;
  value: TypedMoney;
  discounted: DiscountedPrice;
}

export interface TypedMoney {
  centAmount: number;
  currencyCode: string;
  fractionDigits: number;
  type: string;
}

export interface DiscountedPrice {
  value: TypedMoney;
  discount: ProductDiscountReference;
}

export interface ProductDiscountReference {
  id: string;
  typeId: string;
}

export interface Image {
  url: string;
  dimensions: ImageDimensions;
}

export interface ImageDimensions {
  w: number;
  h: number;
}

export interface Category {
  id: string;
  version: number;
  key: string;
  name: LocalizedString;
  slug: LocalizedString;
  description: LocalizedString;
  ancestors: CategoryReference;
  parent: CategoryReference;
  orderHint: string;
}

export interface QueryParam {
  key: string;
  value: number | string;
}

export interface ProductType {
  id: string;
  version: number;
  key: string;
  name: string;
  description: LocalizedString;
  createdAt: Date;
  lastModifiedAt: Date;
}

export interface PriceFilterValue {
  value: string;
  query: string;
}
