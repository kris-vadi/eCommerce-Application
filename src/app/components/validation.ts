import { emailRequirements, passwordRequirements, validTemplates } from './constants';

export const showErrorMessage = (input: HTMLInputElement, notation: HTMLParagraphElement, message: string): void => {
  input.classList.add('error-input');
  notation.innerHTML = `<p class='error-warn'>&#9888;</p>${message}`;
};

export const checkWithRequirements = (requirements: [RegExp, string][], text: string): string => {
  let warning = '';
  requirements.forEach((entries) => {
    warning += !text.match(entries[0]) ? entries[1] : '';
  });
  return warning;
};

export const checkEmail = (email: string): string => {
  let warning = '<p>Email address must be properly formatted (e.g., user@example.com).</p>';
  if (email.match(/^[\w.-]+@/)) {
    warning += '<p>Email address must contain a domain name (e.g., example.com).</p>';
  }
  warning += checkWithRequirements(emailRequirements, email);
  return warning;
};

export const checkDate = (date: string): string => {
  const curDate = new Date();
  const birthdate = new Date(date);
  let age = curDate.getFullYear() - birthdate.getFullYear();
  const monthDiff = curDate.getMonth() - birthdate.getMonth();
  let warning = '';
  age -= 1 * Number(monthDiff < 0 || (monthDiff === 0 && curDate.getDate() - birthdate.getDate() < 0));
  warning = age < 13 ? '<p>You are too young. 13+ Only.</p>' : '';
  return warning;
};

export const checkPostalCode = (input: HTMLInputElement): string => {
  const country = document.getElementById(`${input.id.split('-')[0]}-country`) as HTMLInputElement;
  let reqValue = /^\d{5,6}$/;
  let reqText = 'US: 5 digits, KZ: 6 digits';
  if (country && country.value) {
    reqValue = country.value === 'US' ? /^\d{5}$/ : /^\d{6}$/;
    reqText = country.value === 'US' ? '5 digits' : '6 digits';
  }
  return !input.value.match(reqValue) ? `Must follow the format for the country (${reqText})` : '';
};

export const checkOtherInput = (id: string, text: string): string => {
  const fields = Object.keys(validTemplates);
  if (fields.includes(id)) {
    const ind = fields.indexOf(id);
    const fieldRequirements = Object.entries(validTemplates)[ind][1];
    return !text.match(fieldRequirements[0]) ? fieldRequirements[1] : '';
  }
  return '';
};

export const validateInput = (input: HTMLInputElement, notation: HTMLParagraphElement): void => {
  let warnings = '';
  if (input.value) {
    if (input.id === 'email' && !input.value.match(/^\w+@(\w){2,}\.(\w){2,4}$/)) {
      warnings += checkEmail(input.value);
    } else if (input.id === 'password') {
      warnings += checkWithRequirements(passwordRequirements, input.value);
    } else if (input.id === 'dateOfBirth') {
      warnings += checkDate(input.value);
    } else {
      const id = input.id.startsWith('shipping') || input.id.startsWith('billing') ? input.id.split('-')[1] : input.id;
      if (id === 'postalCode') {
        warnings += checkPostalCode(input);
      } else {
        warnings += checkOtherInput(id, input.value);
      }
    }
  }

  if (warnings) {
    showErrorMessage(input, notation, warnings);
  } else {
    input.classList.remove('error-input');
    notation.innerHTML = '';
  }
};