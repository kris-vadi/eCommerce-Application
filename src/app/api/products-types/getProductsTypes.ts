const getProductsTypes = async (): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  await fetch(
    `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/product-types`,
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
      localStorage.setItem('products_types', JSON.stringify(result.results));
    })
    .catch((error) => {
      if (error) localStorage.setItem('error_getproducts-types', error.message);
      alert('Sorry, this is taking an unusually long time...');
    });
};

export default getProductsTypes;
