const { expect } = require("@playwright/test");

class OrderSummaryPage {
  constructor(page) {
    this.page = page;
    this.order = page.locator(".col-text");
  }

  async assertOrderValeOrderSummaryPage(orderIdValue) {
    //Assert to see if same order id is there in the last page
    const orderIdDetails = await this.order.textContent();
    //orderId.includes(orderIdDetails) - gives boolean value
    expect(orderIdValue.includes(orderIdDetails)).toBeTruthy();
  }
}

module.exports = { OrderSummaryPage };
