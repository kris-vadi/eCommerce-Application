import Router from '../../app/router/router';

describe('isCategory function', () => {
  const routes = [
    {
      path: ``,
      callback: (): void => {},
    },
  ];

  const incorrectCategoryId = '1245';

  const router = new Router(routes);
  const isNotCategory = router.isCategory(incorrectCategoryId);

  it('should return false', () => {
    expect(isNotCategory).toEqual(false);
  });
});
