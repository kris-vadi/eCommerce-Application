import { createElement } from '../components/utils';
import Slider from '../components/slider';
import { stateCategories } from '../state/state';
import getCategories from '../api/category/getCategories';
import { Category } from '../types/types';

class MainPage {
  public drawMainPage(): HTMLDivElement {
    const mainPage = createElement('div', ['main-page', 'main__wrapper']) as HTMLDivElement;
    const categoriesGrid = createElement('div', ['main-page__categories']) as HTMLDivElement;
    const promos = this.drawPromoContainer();

    mainPage.append(promos, categoriesGrid);
    return mainPage;
  }

  private drawPromoContainer(): HTMLDivElement {
    const promoContainer = createElement('div', ['main-page__promo', 'promo__container']) as HTMLDivElement;
    new Slider();

    return promoContainer;
  }

  public async drawCategoriesGrid(categoriesGrid: HTMLDivElement): Promise<void> {

    if (!stateCategories.has('top')) await getCategories('top', [{ key: 'where', value: 'ancestors%20is%20empty' }]);
    const topCategories: Category[] | undefined = stateCategories.has('top') ? stateCategories.get('top') : [];

    topCategories?.forEach(async (category: Category): Promise<void> => {
      const name = category.name['en-US'].toLocaleLowerCase();
      const slug = category.slug['en-US'];

      if (slug !== 'age' && slug !== 'genders') {
        if (!stateCategories.has(name))
            await getCategories(name, [{ key: 'where', value: `parent%28id%3D%22${category.id}%22%29` }]);
        const subcategories: Category[] | undefined = stateCategories.has(name) ? stateCategories.get(name) : [];
  
        subcategories?.forEach((subcategory: Category): void => {
          const currentCategory = createElement('div', [`main-page__category`]) as HTMLDivElement;
          // const img = createElement('img', ['main-page__category-img']) as HTMLImageElement;
          // img.src = `@/assets/img/categories/${subcategory.slug['en-US']}.png`;
          // currentCategory.append(img);
          categoriesGrid.append(currentCategory);
        })
      }
    })
  }
}

export default MainPage;
