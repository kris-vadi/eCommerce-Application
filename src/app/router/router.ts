import getAllProducts from '../api/getProduct/getAllProducts';
import { addNewQueryParam } from '../api/helpers/utils';
import User from '../components/user';
import Catalog from '../pages/catalog';
import { Category, Product, RouteInfo, UrlInfo } from '../types/types';
import { ID_SELECTOR, pages, SUBCATEGORY } from './pages';

class Router {
  routes: RouteInfo[];

  constructor(routes: RouteInfo[]) {
    this.routes = routes;
    this.setEventListeners();
  }

  public navigate(url: string, notPushState?: boolean): void {
    const request = this.parceUrl(url);

    const isProduct: boolean = this.isProductId(request.id);
    const isCategory: boolean = this.isCategory(request.id);

    const pathToFind =
      request.id === ''
        ? `${request.pathname}`
        : `${request.pathname}/${isCategory ? SUBCATEGORY : isProduct ? ID_SELECTOR : ''}`;
    const route = this.routes.find((item: RouteInfo) => item.path === pathToFind);

    if (!route) {
      this.redirectToNotFound();
      return;
    }

    if (this.redirectToMainPageIfLogged(route.path)) return;

    if (!notPushState) {
      window.history.pushState({}, '', request.id === '' ? `${request.pathname}` : `${request.pathname}/${request.id}`);
    }

    route?.callback(request.id);
  }

  private isCategory(id: string): boolean {
    const categories: Category[] = localStorage.getItem('categories')
      ? JSON.parse(localStorage.getItem('categories') as string)
      : [];
    const allCategoriesIds: string[] = [];

    categories.forEach((category: Category) => {
      allCategoriesIds.push(category.slug['ru-KZ']);
    });

    return allCategoriesIds.includes(id);
  }

  private isProductId(id: string): boolean {
    const products: Product[] = localStorage.getItem('all_products')
      ? JSON.parse(localStorage.getItem('all_products') as string)
      : [];
    const allProductsIds: string[] = [];

    products.forEach((product: Product) => {
      allProductsIds.push(product.id);
    });

    return allProductsIds.includes(id);
  }

  private parceUrl(url: string): UrlInfo {
    const paths = url.split('/');
    const result: UrlInfo = {
      pathname: paths[0] ? paths[0] : '',
      id: paths[1] ? paths[1] : '',
    };

    return result;
  }

  private redirectToNotFound(): void {
    this.navigate(pages.NOT_FOUND);
  }

  private redirectToMainPageIfLogged(path: string): boolean {
    if (User.isLogged()) {
      if (path === pages.AUTORIZATION || path === pages.REGISTRATION || path === 'login' || path === 'logout') {
        this.navigate(pages.MAIN);
        return true;
      }
    } else {
      if (path === pages.USER_PROFILE) {
        this.navigate(pages.MAIN);
        return true;
      }
    }

    return false;
  }

  private async navigationByStagedCategories(path: string, id: string): Promise<void> {
    if (this.isCategory(id)) {
      const categories: Category[] = localStorage.getItem('categories')
        ? JSON.parse(localStorage.getItem('categories') as string)
        : [];
      const currentId: string | undefined = categories.find((category: Category) => {
        return category.slug['ru-KZ'] === id;
      })?.id;

      Catalog.clearSortedProducts();
      addNewQueryParam('sidebar', 'where', `masterData%28current%28categories%28id%3D%22${currentId}%22%29%29%29`);

      await getAllProducts();
      this.navigate(`${pages.CATALOG}/${id}`, true);
    } else {
      Catalog.clearSortedProducts();
      this.navigate(path, true);
    }
  }

  private setEventListeners(): void {
    window.addEventListener('DOMContentLoaded', (event: Event): void => {
      event.preventDefault();
      const path = this.getCorrectPath();
      this.navigate(path);
    });

    window.addEventListener('popstate', async (): Promise<void> => {
      const path = this.getCorrectPath();
      const id: string = this.parceUrl(path).id ? this.parceUrl(path).id : '';

      if (id !== '') {
        await this.navigationByStagedCategories(path, id);
      } else {
        Catalog.clearSortedProducts();
        this.navigate(path, true);
      }
    });
  }

  private getCorrectPath(): string {
    if (window.location.hash) {
      return window.location.hash.slice(1);
    }
    return window.location.pathname.slice(1);
  }
}

export default Router;
