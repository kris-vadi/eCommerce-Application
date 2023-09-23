import { ID_SELECTOR, SUBCATEGORY, pages } from './router/pages';
import { RouteInfo } from './types/types';
import MainPage from './pages/main-page';
import LoginPage from './pages/login-page';
import NotFound from './pages/not-found';
import AboutUS from './pages/about-us';
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import Router from './router/router';
import Contacts from './pages/contacts';
import Terms from './pages/terms-conditions';
import RegPage from './pages/registration-page';
import User from './components/user';
import UserProfile from './pages/user-profile';
import Catalog from './pages/catalog';
import Card from './pages/card';
import CartPage from './pages/cart-page';
import Sidebar from './components/sidebar';

class App {
  router: Router;

  header: Header;

  sidebar: Sidebar;

  main: Main;

  footer: Footer;

  user: User;

  constructor() {
    this.user = new User();
    this.router = new Router(this.createRoutes());
    this.header = new Header(this.router);
    this.sidebar = new Sidebar();
    this.main = new Main(this.router, this.sidebar);
    this.footer = new Footer(this.router);
  }

  public async startApp(): Promise<void> {
    await this.sidebar.drawSidebar();
  }

  private createRoutes(): RouteInfo[] {
    return [
      {
        path: `${pages.MAIN}`,
        callback: async (): Promise<void> => {
          setTimeout (async () => {
            const mainPage = new MainPage();
            Main.setContent(await mainPage.drawMainPage());
            const cat = document.querySelector('.main-page__categories') as HTMLDivElement;
            await mainPage.drawCategoriesGrid(cat);
          }, 2000);
        },
      },
      {
        path: `login`,
        callback: (): void => {
          const loginPage = new LoginPage();
          Main.setContent(loginPage.drawLoginPage());
        },
      },
      {
        path: `${pages.AUTORIZATION}`,
        callback: (): void => {
          const loginPage = new LoginPage();
          Main.setContent(loginPage.drawLoginPage());
        },
      },
      {
        path: `signup`,
        callback: (): void => {
          const regPage = new RegPage();
          Main.setContent(regPage.drawRegPage());
        },
      },
      {
        path: `${pages.REGISTRATION}`,
        callback: (): void => {
          const regPage = new RegPage();
          Main.setContent(regPage.drawRegPage());
        },
      },
      {
        path: `${pages.USER_PROFILE}`,
        callback: (): void => {
          const userProfile = new UserProfile();
          Main.setContent(userProfile.drawProfile());
        },
      },
      {
        path: `${pages.CATALOG}`,
        callback: async (): Promise<void> => {
          const catalog = new Catalog();
          Main.setContent(await catalog.drawCatalog());
          Catalog.drawProducts();
        },
      },
      {
        path: `${pages.CATALOG}/${SUBCATEGORY}`,
        callback: async (): Promise<void> => {
          const catalog = new Catalog();
          Main.setContent(await catalog.drawCatalog());
          Catalog.drawProducts();
        },
      },
      {
        path: `${pages.CATALOG}/${ID_SELECTOR}`,
        callback: async (id): Promise<void> => {
          if (id) {
            const card = new Card(id);
            Main.setContent(await card.drawCard());
          }
        },
      },
      {
        path: `${pages.CART}`,
        callback: (): void => {
          const cart = new CartPage();
          Main.setContent(cart.drawCart());
        },
      },
      {
        path: `${pages.ABOUT_US}`,
        callback: (): void => {
          const aboutUs = new AboutUS();
          Main.setContent(aboutUs.drawAboutUs());
        },
      },
      {
        path: `${pages.CONTACTS}`,
        callback: (): void => {
          const contacts = new Contacts();
          Main.setContent(contacts.drawContacts());
        },
      },
      {
        path: `${pages.TERMS_AND_CONDITIONS}`,
        callback: (): void => {
          const terms = new Terms();
          Main.setContent(terms.drawTerms());
        },
      },
      {
        path: `${pages.NOT_FOUND}`,
        callback: (): void => {
          const notFound = new NotFound(this.router);
          Main.setContent(notFound.drawNotFound());
        },
      },
    ];
  }
}

export default App;
