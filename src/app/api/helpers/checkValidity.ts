export const checkValidity = (): boolean => {
  const errorBlocks = document.querySelectorAll('.error-message');

  for (let i = 0; i < errorBlocks.length; i += 1) {
    if (errorBlocks[i].innerHTML) {
      return false;
    }
  }
  return true;
};
