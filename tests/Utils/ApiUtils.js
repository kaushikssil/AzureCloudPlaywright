class ApiUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }
  //Function for gettingthe session id from Login Api
  async getSessionToken() {
    //Login API Behavious
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayload,
      },
    );

    //Assert that the status code is 200
    //expect((await loginResponse).ok()).toBeTruthy();

    //Let us get the response in JSON fomat - json()
    const loginResponseJSON = await (await loginResponse).json();

    //Get the "token" value from RESPONSE
    //To look at JSON PATH use - https://jsoneditoronline.org/#right=local.qetati&left=local.hulalo
    const sessionToken = loginResponseJSON.token;
    console.log(sessionToken);
    return sessionToken;
  }

  //Function to get the order id from Place Order Api
  async getorderId(orderPayload) {
    //Create an empty object
    let response = {};

    //Call the getSessionToken() method
    response.sessionToken = await this.getSessionToken();

    //Place Order Behaviour
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,

        headers: {
          Authorization: response.sessionToken,
          "Content-Type": "application/json",
        },
      },
    );

    //Convert the response in JSON format
    const orderResponseJSON = await orderResponse.json();

    //get the order id
    //To look at JSON PATH use - https://jsoneditoronline.org/#right=local.qetati&left=local.hulalo
    response.orderId = orderResponseJSON.orders[0];
    console.log(response.orderId);

    return response;
  }
}

//Export the class
module.exports = { ApiUtils };
