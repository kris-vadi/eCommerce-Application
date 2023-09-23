import AboutUS from '../../app/pages/about-us';

describe('Class AboutUS: drawAboutUs function', () => {
  document.body.innerHTML = '';
  const aboutUs = new AboutUS();
  document.body.append(aboutUs.drawAboutUs());
  const title = document.querySelector('.about-us__title');
  const content = document.querySelector('.about-us__content')?.children;

  it('should create about us page', () => {
    expect(aboutUs).not.toBeNull();
  });

  it('should create title', () => {
    expect(title?.innerHTML).toBe(`MEET OUR TEAM`);
  });

  it('should create content', () => {
    expect(content?.length).toEqual(4);
  });
});
