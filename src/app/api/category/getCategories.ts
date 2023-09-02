import { Category, QueryParam } from '../../types/types';
import { generateQueryParams } from '../helpers/utils';

const getCategories = (
  dataName?: string,
  queryParams?: Map<string, QueryParam> | QueryParam[],
): Promise<Category[]> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  return fetch(
    `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/categories?limit=500${generateQueryParams(
      queryParams,
    )}`,
    requestOptions,
  )
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        throw new Error(`The error with status code ${response.status} has occured, please try later`);
      }
    })
    .then((result) => {
      if (queryParams && dataName !== '') {
        localStorage.setItem(`${dataName}_categories`, JSON.stringify(result.results));
      } else {
        localStorage.setItem('all_categories', JSON.stringify(result.results));
      }

      return result.results;
    })
    .catch((error) => {
      if (error) localStorage.setItem('error_getcategories_message', error.value);
    });
};

export default getCategories;
