const { expect } = require("@playwright/test");

class PaymentMethodPage {
  constructor(page) {
    this.page = page;

    this.textCreditCardNumber = page.locator("text=Credit Card Number ");
    this.creditCard = page.locator(".field input.text-validated");
    this.cardExpiry = page.locator("text=Expiry Date ");
    this.dropDownMonth = page.locator("select.ddl");
    this.dropDownYear = page.locator("select.ddl");
    this.cvvCodeText = page.locator(".small .title");
    this.cvvCodeEditbox = page.locator(".small .txt");
    this.nameOncardText = page.locator("text=Name on Card ");
    this.nameOnCardField = page.locator(".field .txt");
    this.emailText = page.locator(".user__name [type='text']");
    this.dropDownCountry = page.locator("[placeholder='Select Country']");
    this.dropdown = page.locator(".ta-results");
    this.placeOrderButton = page.locator(".action__submit");
  }

  async assertTextCreateCardnumberPresent() {
    //Assert that the text CREDIT CARD NUMBER is present
    await expect(this.textCreditCardNumber).toHaveText("Credit Card Number ");
  }

  async typeCreditCard() {
    //Clear and type the credit card number
    await this.creditCard.fill("");
    await this.creditCard.fill("4323123454234534");
  }

  async assertExpiryDateVisible() {
    //Assert the EXPIRY DATE IS VISIBLE
    expect(await this.cardExpiry.isVisible()).toBeTruthy();
  }

  async dropDownMonthSelect() {
    //Click on the month drop down created by SELECT tag. Select 03 as the month from the options
    const month = this.dropDownMonth.first();
    await month.selectOption("03");
  }

  async dropDownYearSelect() {
    //Click on the year drop down created by SELECT tag. Select 24 as the year from the options
    const year = this.dropDownYear.last();
    await year.selectOption("24");
  }

  async assertCVVCodeTextPresent() {
    //Assert the CVV Code text is present
    const textCVV = await this.cvvCodeText.nth(1).textContent();
    console.log(textCVV);
    expect(textCVV).toContain("CVV Code");
  }

  async typeCvvCodeEditBox() {
    //Type on CVV Code edit box
    await this.cvvCodeEditbox.first().fill("213");
  }

  async assertNameOnCardTextVisible() {
    //Assert that the text NAME ON CARD is visible
    expect(await this.nameOncardText.isVisible()).toBeTruthy();
  }

  async typeNameOncardEditBox() {
    //Type on Name on card field
    await this.nameOnCardField.nth(2).fill("Kaushik Mukherjee");
  }

  async assertEmailText(name) {
    //Assert that the text is the email
    await expect(this.emailText.first()).toHaveText(name);
  }

  async chooseAutoSuggestionData(countryName, countryInitial) {
    //Auto suggestion on Select Country edit box
    //Use pressSequentially() method to press each letter one by one
    await this.dropDownCountry.pressSequentially(countryInitial);

    await this.dropdown.waitFor();

    const numOfCountryWithINDAsSubString = await this.dropdown
      .locator("button")
      .count();
    console.log(numOfCountryWithINDAsSubString);
    const optionsCount = await this.dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
      const text = await this.dropdown.locator("button").nth(i).textContent();
      if (text === countryName) {
        await this.dropdown.locator("button").nth(i).click();
        break;
      }
    }
  }

  async clickPlaceOrderButton() {
    //Click on Place order
    await this.placeOrderButton.click();

    //Wait for netwrok calls to be over for Thank You page
    //await this.page.waitForLoadState("networkidle");
  }
}

module.exports = { PaymentMethodPage };
