const { test, expect } = require("@playwright/test");
//const { LoginPage } = require("./PageObject/LoginPage");
const { PageObjectManager } = require("./PageObject/PageObjectManager");

//Convert from JSON TO JAVASCRIPT OBJECT
const dataset = JSON.parse(
  //Converting from JSON format to String - because sometine UTF-8 encoding creates a problem
  JSON.stringify(require("./Utils/UiTestPOMParameterization.json")),
);

for (const data of dataset) {
  test(`@Api End to End Playwright Test - POM with parameterization for ${data.productName}`, async ({
    page,
  }) => {
    const rows = page.locator("tbody tr");

    //PageObjectManager page - object
    const pageObjectManager = new PageObjectManager(page);
    const loginPage = pageObjectManager.getLoginPage();
    const dashboardPage = pageObjectManager.getDashboardPage();
    //MyCartPage Page - OBJECT
    const myCartPage = pageObjectManager.getMyCartPage();
    //PaymentMethodPage Page - OBJECT
    const paymentMethodPage = pageObjectManager.getPaymentMethodPage();
    //ThankYouPage Page - OBJECT
    const thankYouPage = pageObjectManager.getThankYouPage();
    //YourOrderPage Page - OBJECT
    const yourOrderPage = pageObjectManager.getYourOrderPage();
    //OrderSummaryPage page - OBJECT
    const orderSummaryPage = pageObjectManager.getOrderSummaryPage();

    //Navigate to URL
    await loginPage.goToUrl();
    //Type on Username field, password field and click on login button, Wait until all network calls are loaded
    await loginPage.validLogin(data.username, data.password);

    //Click ADD TO CART button for the product name 'ZARA COAT 3'
    await dashboardPage.clickAddToCartBasedOnProductName(data.productName);

    //Click on the CART Link
    await dashboardPage.clickCartLink();

    //My Cart Page
    //Assert that text ZARA COAT 3 is visible in CART PAGE
    await myCartPage.assertVisibilityTextZara();

    //Click on Checkout button
    await myCartPage.clickCheckoutButton();

    //Payment Method Page
    //Assert that the text CREDIT CARD NUMBER is present
    await paymentMethodPage.assertTextCreateCardnumberPresent();

    //Clear and type the credit card number
    await paymentMethodPage.typeCreditCard();

    //Assert the EXPIRY DATE IS VISIBLE
    await paymentMethodPage.assertExpiryDateVisible();

    //Click on the month drop down created by SELECT tag. Select 03 as the month from the options
    await paymentMethodPage.dropDownMonthSelect();

    //Click on the year drop down created by SELECT tag. Select 24 as the year from the options
    await paymentMethodPage.dropDownYearSelect();

    //Assert the CVV Code text is present
    await paymentMethodPage.assertCVVCodeTextPresent();

    //Type on CVV Code edit box
    await paymentMethodPage.typeCvvCodeEditBox();

    //Assert that the text NAME ON CARD is visible
    await paymentMethodPage.assertNameOnCardTextVisible();

    //Type on Name on card field
    await paymentMethodPage.typeNameOncardEditBox();

    //Assert that the text is the email
    await paymentMethodPage.assertEmailText(data.username);

    //Auto suggestion on Select Country edit box
    await paymentMethodPage.chooseAutoSuggestionData(
      data.countryName,
      data.countryInitial,
    );

    //Click on Place order
    await paymentMethodPage.clickPlaceOrderButton();

    //ThankYou Page
    //Assertion for the text to be Thankyou for the order.
    await thankYouPage.assertTextThankYou();

    //Get the order id
    let orderId = await thankYouPage.getOrderId();
    console.log("Thank You Page order id value is " + orderId);

    //Click on ORDERS buttton
    await thankYouPage.clickOrderButton();

    //Your Order Page
    //Click on VIEWS button based on order
    await yourOrderPage.iterateSpecificOrderClickViewsButton(orderId);

    //Assert that the order value is truw in order summary page
    await orderSummaryPage.assertOrderValeOrderSummaryPage(orderId);
  });
}
