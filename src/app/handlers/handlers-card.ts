import { changeLineItem } from '../api/cart/changeLineItem';
import { createMyCart } from '../api/cart/createMyCart';
import { pages } from '../router/pages';
import Router from '../router/router';

const getId = async (target: HTMLElement): Promise<string | undefined> => {
  const form = target.closest('.product-card__form') as HTMLElement;
  return form ? form.dataset.id : '';
};

export const toggleCardAddProductButton = async (target: HTMLElement, router: Router): Promise<void> => {
  if (!localStorage.cart) await createMyCart();
  const id = await getId(target);

  if (target.textContent !== 'add to cart') {
    changeLineItem(id, 'remove').then(() => {
      target.innerText = 'add to cart';
      target.classList.add('button_green');
      router.navigate(`${pages.CATALOG}/${id}`, true);
    });
  } else {
    changeLineItem(id, 'add', 1).then(() => {
      target.innerText = 'remove from cart';
      target.classList.remove('button_green');
      router.navigate(`${pages.CATALOG}/${id}`, true);
    });
  }
};

export const changeCartItemQuantityFromCard = async (
  target: HTMLElement,
  router: Router,
  action: 'add' | 'decrease',
): Promise<void> => {
  if (!localStorage.cart) await createMyCart();
  const id = await getId(target);

  changeLineItem(id, action, 1).then(() => {
    router.navigate(`${pages.CATALOG}/${id}`, true);
  });
};

const makeMiniActive = (slideIndex: number): void => {
  const minis = document.querySelectorAll('.product-card__mini') as NodeListOf<HTMLDivElement>;

  minis.forEach((mini) => {
    mini.classList.remove('active-mini');
  });
  minis[slideIndex - 1].classList.add('active-mini');
};

export const toggleCardModal = (slideIndex: number): void => {
  const modal = document.querySelector('.modal-card__dimming');
  modal?.classList.toggle('modal-active');
  if (modal?.classList.contains('modal-active')) {
    const slidesRow = document.querySelector('.modal-card__slides-row') as HTMLDivElement;
    const slides = document.querySelectorAll('.modal-card__slide') as NodeListOf<HTMLDivElement>;
    const width = slides[0].clientWidth + 60;

    slidesRow.style.transform = `translateX(${-width * (slideIndex - 1)}px)`;
  } else {
    const slidesRow = document.querySelector('.product-card__slides-row') as HTMLDivElement;
    const slides = document.querySelectorAll('.product-card__slide') as NodeListOf<HTMLDivElement>;
    const miniRow = document.querySelector('.product-card__minis-row');
    const width = slides[0].clientWidth + 60;

    slidesRow.style.transform = `translateX(${-width * (slideIndex - 1)}px)`;
    if (miniRow) {
      makeMiniActive(slideIndex);
    }
  }
};

export const getImagebyMini = (target: HTMLElement): void => {
  const cardWrapper = document.querySelector('.product-card') as HTMLDivElement;
  let currentIndex = +cardWrapper.getAttribute('data-slideIndex')!;

  const slidesRow = document.querySelector('.product-card__slides-row') as HTMLDivElement;
  const slides = document.querySelectorAll('.product-card__slide') as NodeListOf<HTMLDivElement>;
  const width = slides[0].clientWidth + 60;

  currentIndex = +target.getAttribute('data-index')!;
  cardWrapper.setAttribute('data-slideIndex', `${currentIndex}`);
  slidesRow.style.transform = `translateX(${-width * (currentIndex - 1)}px)`;
  makeMiniActive(currentIndex);
};

export const switchNextSlide = (): void => {
  const cardWrapper = document.querySelector('.product-card') as HTMLDivElement;
  let currentIndex = +cardWrapper.getAttribute('data-slideIndex')!;

  const slidesRow = document.querySelector('.product-card__slides-row') as HTMLDivElement;
  const slides = document.querySelectorAll('.product-card__slide') as NodeListOf<HTMLDivElement>;
  const width = slides[0].clientWidth + 60;

  const slidesRowModal = document.querySelector('.modal-card__slides-row') as HTMLDivElement;
  const slidesModal = document.querySelectorAll('.modal-card__slide') as NodeListOf<HTMLDivElement>;
  const widthModal = slidesModal[0].clientWidth + 60;

  if (currentIndex > slides.length - 1) {
    currentIndex = 1;
    cardWrapper.setAttribute('data-slideIndex', `${currentIndex}`);

    slidesRow.style.transform = `none`;
    slidesRowModal.style.transform = `none`;
  } else {
    slidesRow.style.transform = `translateX(${-width * currentIndex}px)`;
    slidesRowModal.style.transform = `translateX(${-widthModal * currentIndex}px)`;

    currentIndex++;
    cardWrapper.setAttribute('data-slideIndex', `${currentIndex}`);
  }
  makeMiniActive(currentIndex);
};

export const switchPrevSlide = (): void => {
  const cardWrapper = document.querySelector('.product-card') as HTMLDivElement;
  let currentIndex = +cardWrapper.getAttribute('data-slideIndex')!;

  const slidesRow = document.querySelector('.product-card__slides-row') as HTMLDivElement;
  const slides = document.querySelectorAll('.product-card__slide') as NodeListOf<HTMLDivElement>;
  const width = slides[0].clientWidth + 60;

  const slidesRowModal = document.querySelector('.modal-card__slides-row') as HTMLDivElement;
  const slidesModal = document.querySelectorAll('.modal-card__slide') as NodeListOf<HTMLDivElement>;
  const widthModal = slidesModal[0].clientWidth + 60;

  if (currentIndex <= 1) {
    currentIndex = slides.length;
    cardWrapper.setAttribute('data-slideIndex', `${currentIndex}`);

    slidesRow.style.transform = `translateX(${-width * (currentIndex - 1)}px)`;
    slidesRowModal.style.transform = `translateX(${-widthModal * (currentIndex - 1)}px)`;
  } else {
    currentIndex--;
    cardWrapper.setAttribute('data-slideIndex', `${currentIndex}`);

    slidesRow.style.transform = `translateX(${-width * (currentIndex - 1)}px)`;
    slidesRowModal.style.transform = `translateX(${-widthModal * (currentIndex - 1)}px)`;
  }
  makeMiniActive(currentIndex);
};
