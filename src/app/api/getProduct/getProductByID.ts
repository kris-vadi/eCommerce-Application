const getProductByID = async (productID: string): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  await fetch(
    `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/products/${productID}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => {
      localStorage.setItem('currentProduct-data', JSON.stringify(result));
    });
};

export default getProductByID;
