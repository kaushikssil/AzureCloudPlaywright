class DashboardPage {
  constructor(page) {
    this.page = page;

    this.product = page.locator(".card-body");
    this.productContent = page.locator(".card-body b");
    this.cartLink = page.locator("[routerlink*= 'cart']");
  }

  //Click ADD TO CART button for the product name 'ZARA COAT 3'
  async clickAddToCartBasedOnProductName(productName) {
    //Wait for the DOM to get loaded for the first element and the locator values is ".card-body"
    await this.product.first().waitFor();

    //Get text of all elements which have the locator as '.card-body b'
    const allTextWithSameLocator = await this.productContent.allTextContents();
    console.log(allTextWithSameLocator);

    //Number of items have same locator value
    const numberProductWithSameLocator = await this.product.count();
    console.log(numberProductWithSameLocator);

    //Iterate over the elements with locator as ".card-body"  and click on Add to cart for the item name ZARA COAT 3
    for (let i = 0; i < numberProductWithSameLocator; i++) {
      const itemtext = await this.product.nth(i).locator("b").textContent();
      console.log(itemtext);
      if (itemtext === productName) {
        //TEXT LOCATOR USED HERE - PLAYWRIGHT BASED LOCATOR
        await this.product.nth(i).locator("text = Add To Cart").click();
        break;
      }
    }
  }

  //Click on the CART Link
  async clickCartLink() {
    await this.cartLink.click();
  }
}

module.exports = { DashboardPage };
