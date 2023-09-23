import NotFound from '../../app/pages/not-found';
import Router from '../../app/router/router';
import { pages } from '../../app/router/pages';

describe('Class NotFound: drawNotFound function', () => {
  document.body.innerHTML = '';
  const routes = [
    {
      path: `${pages.MAIN}`,
      callback: (): void => {},
    },
  ];
  document.body.append(new NotFound(new Router(routes)).drawNotFound());
  const notFound = document.querySelector('.not-found');
  const heading = document.querySelector('.not-found__heading');
  const message = document.querySelector('.not-found__message');
  const button = document.querySelector('.not-found__button');

  it('should create not-found page', () => {
    expect(notFound).not.toBeNull();
  });

  it('should create inner elements', () => {
    expect(heading?.innerHTML).toEqual(`ERROR 404`);
    expect(message?.innerHTML).toEqual(`Oops! The page you are looking for could not be found.`);
    expect(button?.innerHTML).toEqual(`BACK TO HOME`);
  });
});
