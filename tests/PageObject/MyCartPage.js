const { expect } = require("@playwright/test");

class MyCartPage {
  constructor(page) {
    this.page = page;
    this.itemDetails = page.locator("div li");
    //Another way to use the "text" locator in playwright
    this.itemZara = page.locator(".cartSection h3");
    this.checkoutButton = page.locator("text=Checkout");
  }

  async assertVisibilityTextZara() {
    //Wait for the DOM to get loaded in CART page
    //The locator "div li" is taken as it engulf everythig for every item in the cart
    await this.itemDetails.first().waitFor();

    //Assert that text ZARA COAT 3 is visible in CART PAGE
    const bool = await this.itemZara.isVisible();
    expect(bool).toBeTruthy();
  }

  async clickCheckoutButton() {
    //Click on CHECKOUT button
    await this.checkoutButton.click();
  }
}

module.exports = { MyCartPage };
