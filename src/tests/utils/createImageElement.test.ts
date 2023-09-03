import { createImageElement } from '../../app/components/utils';

describe('createImageElement function', () => {
  document.body.innerHTML = '';
  const imageWithoutAttributes = createImageElement(
    'https://7e5d71dd652c6b05d1c2-bac3a54812d7e55ad71e25d83b8d54a6.ssl.cf5.rackcdn.com/liewood-ishan-puzzle-2tUniSQz.png',
    ['image__without-attributes'],
  );
  const imageWithAttributes = createImageElement(
    'https://7e5d71dd652c6b05d1c2-bac3a54812d7e55ad71e25d83b8d54a6.ssl.cf5.rackcdn.com/liewood-ishan-puzzle-2tUniSQz.png',
    ['image__with-attributes'],
    { width: 500, height: 600 },
  );
  document.body.append(imageWithoutAttributes, imageWithAttributes);

  it('should create images', () => {
    expect(imageWithoutAttributes).not.toBeNull();
    expect(imageWithAttributes).not.toBeNull();
  });

  it('should add classes to elements', () => {
    expect(imageWithoutAttributes.classList).toContain('image__without-attributes');
    expect(imageWithAttributes.classList).toContain('image__with-attributes');
  });

  it('should add attributes if needed', () => {
    expect(imageWithAttributes.width).toEqual(500);
    expect(imageWithAttributes.height).toEqual(600);
  });
});
