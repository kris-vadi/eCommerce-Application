import { generateQueryParams } from '../helpers/utils';
import { catalogQueryParams, productLimit } from '../../state/state';
import { Product } from '../../types/types';

const getAllProducts = async (limit?: number): Promise<Product[]> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  return fetch(
    `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/products?limit=${
      limit ? limit : productLimit.limit
    }${catalogQueryParams.size > 0 ? generateQueryParams(catalogQueryParams) : ''}`,
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
      if (!limit) {
        if (catalogQueryParams.size === 0) {
          localStorage.setItem('all_products', JSON.stringify(result.results));
          localStorage.setItem('sorted_products', JSON.stringify(result.results));
        } else {
          localStorage.setItem('sorted_products', JSON.stringify(result.results));
        }
      }
      return result.results;
    })
    .catch((error) => {
      if (error) localStorage.setItem('error_getproducts', error.message);
      alert('Sorry, this is taking an unusually long time...');
    });
};

export default getAllProducts;
