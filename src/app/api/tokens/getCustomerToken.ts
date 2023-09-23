const customerTokenURL = `https://auth.australia-southeast1.gcp.commercetools.com/oauth/ecommerce-application-jsfe2023/customers/token`;

const myHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Authorization: 'Basic bVg4MUEzUXA5OFJnOVphdU5zakwxVFJWOm94ZnI3dXdxTkplTWJIZFRXUFJHUFBIcVU1ZWlPSlVy',
};

const getCustomerToken = async (username: string, password: string): Promise<void> => {
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: `grant_type=password&username=${username}&password=${encodeURIComponent(password)}`,
  };

  await fetch(customerTokenURL, requestOptions)
    .then(async (res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        throw new Error(`The error with status code ${res.status} has occured, please reload page`);
      }
    })
    .then(async (res) => {
      localStorage.setItem('token_info', JSON.stringify(res));
      localStorage.setItem('type_of_token', 'customer');
    })
    .catch((error) => {
      if (error) localStorage.setItem('error_get-customer-token', error.message);
      alert('Sorry, this is taking an unusually long time...');
    });
};

export default getCustomerToken;
