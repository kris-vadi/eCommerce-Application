import Router from '../../app/router/router';
import { UrlInfo } from '../../app/types/types';

describe('isCategory function', () => {
  const routes = [
    {
      path: ``,
      callback: (): void => {},
    },
  ];

  const url = 'category/indoor';
  const expectedResult: UrlInfo = {
    pathname: 'category',
    id: 'indoor',
  };

  const router = new Router(routes);
  const parceUrl: UrlInfo = router.parceUrl(url);

  it('should return correct url path', () => {
    expect(parceUrl).toEqual(expectedResult);
  });
});
