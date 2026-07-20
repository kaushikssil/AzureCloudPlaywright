class YourOrderPage {
  constructor(page) {
    this.page = page;
    this.rows = page.locator("tbody tr");
    this.tableBody = page.locator("tbody");
  }

  async iterateSpecificOrderClickViewsButton(orderIdValue) {
    //Wait for the table body to get loaded
    await this.tableBody.waitFor();

    //Iterate over the rows
    for (let i = 0; i < (await this.rows.count()); ++i) {
      //Get the order id
      const rowOrderId = await this.rows.nth(i).locator("th").textContent();
      //Order id generated matches
      if (orderIdValue.includes(rowOrderId)) {
        //Click on VIEWS button
        await this.rows.nth(i).locator("button").first().click();
        break;
      }
    }
  }
}
module.exports = { YourOrderPage };
