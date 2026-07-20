const { expect } = require("@playwright/test");

class ThankYouPage {
  constructor(page) {
    this.page = page;
    this.textThankYou = page.locator(".hero-primary");
    this.orderButton = page.locator("button[routerlink*='myorders']");
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
  }

  async assertTextThankYou() {
    //Assertion for the text to be Thankyou for the order.
    await expect(this.textThankYou).toHaveText(" Thankyou for the order. ");
  }

  async getOrderId() {
    //Get the order id
    const orderIdVal = await this.orderId.textContent();
    console.log("Thank you page" + orderIdVal);
    return orderIdVal;
  }

  async clickOrderButton() {
    //Click on ORDERS buttton
    await this.orderButton.click();
    //await this.page.waitForLoadState("networkidle");
  }
}

module.exports = { ThankYouPage };
