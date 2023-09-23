import CartPage from '../../app/pages/cart-page';

const cartInfo = {
  type: 'Cart',
  id: 'd3de1a68-165a-4ad5-b6bf-016d30c786e7',
  version: 22,
  customerId: '5eed1696-d822-4d08-9bd7-79b2e979ed8a',
  lineItems: [
    {
      id: '7b0722e7-95d7-4896-8fbe-3ec7ebc69c9b',
      productId: '1f64c46d-652f-45c4-925b-eaaf68c70889',
      productKey: '015.00',
      name: {
        'ru-KZ': 'Liewood Ishan Puzzle',
        'en-US': 'Liewood Ishan Puzzle',
      },
      variant: {
        id: 1,
        sku: 'RST-PJ-001-blue',
        key: 'blue-mix',
        prices: [
          {
            id: '749ec0b3-6f39-4b54-96ae-80287def66b8',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 1500,
              fractionDigits: 2,
            },
            key: 'RST-PJ-001-blue-ALL',
          },
          {
            id: 'c8d6fc12-27a5-47f0-b55d-957019775bcb',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 1500,
              fractionDigits: 2,
            },
            key: 'RST-PJ-001-blue-USD',
            country: 'US',
          },
        ],
        images: [
          {
            url: 'https://7e5d71dd652c6b05d1c2-bac3a54812d7e55ad71e25d83b8d54a6.ssl.cf5.rackcdn.com/liewood-ishan-puzzle-2tUniSQz.png',
            dimensions: {
              w: 713,
              h: 713,
            },
          },
        ],
        attributes: [
          {
            name: 'price',
            value: 15.5,
          },
        ],
        assets: [],
        availability: {
          isOnStock: true,
          availableQuantity: 5,
          version: 1,
          id: 'bed03eb9-23dd-460e-8342-9fdeda6a29a2',
        },
      },
      price: {
        id: '749ec0b3-6f39-4b54-96ae-80287def66b8',
        value: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 1500,
          fractionDigits: 2,
        },
        key: 'RST-PJ-001-blue-ALL',
      },
      quantity: 2,
      discountedPricePerQuantity: [],
      perMethodTaxRate: [],
      state: [
        {
          quantity: 2,
          state: {
            typeId: 'state',
            id: '6c03f77f-3741-420d-a073-c66b37a91161',
          },
        },
      ],
      priceMode: 'Platform',
      lineItemMode: 'Standard',
      totalPrice: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 3000,
        fractionDigits: 2,
      },
      taxedPricePortions: [],
    },
    {
      id: '6117d3d1-555c-470b-9d90-e10f1b9ed83d',
      productId: 'dbd1246d-ff47-4b90-9997-645b03864fe4',
      productKey: '023.20',
      name: {
        'en-US': 'Little Dutch Wooden Stacking Train',
        'ru-KZ': 'Little Dutch Wooden Stacking Train',
      },
      variant: {
        id: 1,
        sku: 'RST-TRW-001',
        key: 'train-1',
        prices: [
          {
            id: '516cafe1-b50b-4c89-96d4-804411cfdbb9',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 2900,
              fractionDigits: 2,
            },
            key: 'RST-TRW-001-blue-ALL',
            discounted: {
              value: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 2320,
                fractionDigits: 2,
              },
              discount: {
                typeId: 'product-discount',
                id: 'b8988bf9-77e2-4b74-9da9-af151ff7ffc2',
              },
            },
          },
          {
            id: 'fac9dc98-9ef2-40dd-a4ea-4fadd7562a71',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 2900,
              fractionDigits: 2,
            },
            key: 'RST-TRW-001-blue-USD',
            country: 'US',
            discounted: {
              value: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 2320,
                fractionDigits: 2,
              },
              discount: {
                typeId: 'product-discount',
                id: 'b8988bf9-77e2-4b74-9da9-af151ff7ffc2',
              },
            },
          },
        ],
        images: [
          {
            url: 'https://7e5d71dd652c6b05d1c2-bac3a54812d7e55ad71e25d83b8d54a6.ssl.cf5.rackcdn.com/little-dutch-wooden--I5vuA3RU.png',
            dimensions: {
              w: 1100,
              h: 1100,
            },
          },
        ],
        attributes: [],
        assets: [],
      },
      price: {
        id: '516cafe1-b50b-4c89-96d4-804411cfdbb9',
        value: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 2900,
          fractionDigits: 2,
        },
        key: 'RST-TRW-001-blue-ALL',
        discounted: {
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 2320,
            fractionDigits: 2,
          },
          discount: {
            typeId: 'product-discount',
            id: 'b8988bf9-77e2-4b74-9da9-af151ff7ffc2',
          },
        },
      },
      quantity: 9,
      discountedPricePerQuantity: [],
      perMethodTaxRate: [],
      priceMode: 'Platform',
      lineItemMode: 'Standard',
      totalPrice: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 20880,
        fractionDigits: 2,
      },
      taxedPricePortions: [],
    },
  ],
  cartState: 'Active',
  totalPrice: {
    type: 'centPrecision',
    currencyCode: 'USD',
    centAmount: 35880,
    fractionDigits: 2,
  },
  discountCodes: [],
  directDiscounts: [],
  inventoryMode: 'None',
  taxMode: 'Platform',
  taxRoundingMode: 'HalfEven',
  taxCalculationMode: 'LineItemLevel',
  totalLineItemQuantity: 11,
};

describe('Class CartPage: drawCart function', () => {
  localStorage.setItem('cart', JSON.stringify(cartInfo));

  document.body.innerHTML = '';
  const cart = new CartPage();
  document.body.append(cart.drawCart());

  it('should create cart header with its elements', () => {
    const header = document.querySelector('.cart__header');
    expect(header).not.toBeNull();
    expect(header?.childElementCount).toEqual(2);
    expect(header?.children[0].innerHTML).toEqual('Cart');
    expect(header?.children[1] instanceof HTMLButtonElement).toBeTruthy();
    expect(header?.children[0].classList).toContain('cart__title');
    expect(header?.children[1].classList).toContain('cart__delete-cart-btn');
    expect(header?.children[1].classList).toHaveLength(3);
  });

  it('should create empty cart with its elements and hide it', () => {
    const msg = document.querySelector('.cart__empty__message');
    expect(msg).toBeDefined();
    expect(msg?.innerHTML).not.toEqual('');
    expect(msg?.childElementCount).toEqual(2);
    expect(msg?.children[0].innerHTML).toEqual('Your cart is empty...');
    expect(msg?.children[1] instanceof HTMLParagraphElement).toBeTruthy();
    const empty = document.querySelector('.cart__empty');
    expect(empty?.classList).toContain('cart__hidden');
  });

  it('should create cart items with products', () => {
    const inds = document.querySelectorAll('.cart__item__index');
    expect(inds.length).toBe(2);
    expect(inds[0].innerHTML).toEqual('1');
    const title = document.querySelector('.cart__item__title');
    expect(title?.textContent).toEqual('Liewood Ishan Puzzle');
    const amount = document.querySelectorAll('.cart__item__amount-value');
    expect(amount[1].textContent).toEqual('9');
    const discount = document.querySelector('.cart__discont-btn');
    expect(discount instanceof HTMLButtonElement).toBeTruthy();
    expect(discount?.textContent).toEqual('apply code');
  });
});
