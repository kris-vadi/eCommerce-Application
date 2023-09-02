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
import getAnonymousToken from './api/tokens/getAnonymousToken';
import getAllProducts from './api/getProduct/getAllProducts';
import Card from './pages/card';

class App {
  router: Router;

  header: Header;

  main: Main;

  footer: Footer;

  user: User;

  constructor() {
    getAnonymousToken().then(() => {
      getAllProducts();
    });
    this.user = new User();
    this.router = new Router(this.createRoutes());
    this.header = new Header(this.router);
    this.main = new Main(this.router);
    this.footer = new Footer(this.router);
  }

  public startApp(): void {}

  private createRoutes(): RouteInfo[] {
    return [
      {
        path: `${pages.MAIN}`,
        callback: (): void => {
          const mainPage = new MainPage();
          Main.setContent(mainPage.drawMainPage());
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
        callback: (): void => {
          const catalog = new Catalog();
          Main.setContent(catalog.drawCatalog());
          Catalog.drawProducts();
        },
      },
      {
        path: `${pages.CATALOG}/${SUBCATEGORY}`,
        callback: (): void => {
          const catalog = new Catalog();
          Main.setContent(catalog.drawCatalog());
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
