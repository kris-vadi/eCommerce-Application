import getCategories from '../api/category/getCategories';
import User from '../components/user';
import { Category, RouteInfo, UrlInfo, Product } from '../types/types';
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

    this.isCategory(request.id).then((isCategory: boolean) => {
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
        window.history.pushState({}, '', `${request.pathname}/${request.id}`);
      }

      route?.callback(request.id);
    });
  }

  private async isCategory(id: string): Promise<boolean> {
    const categories: Category[] = await getCategories('');
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

  private setEventListeners(): void {
    window.addEventListener('DOMContentLoaded', (event: Event): void => {
      event.preventDefault();
      const path = this.getCorrectPath();
      this.navigate(path);
    });

    window.addEventListener('popstate', (): void => {
      const path = this.getCorrectPath();
      this.navigate(path, true);
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
