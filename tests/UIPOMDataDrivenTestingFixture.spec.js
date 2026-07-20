const { test, expect } = require("@playwright/test");
//const { LoginPage } = require("./PageObject/LoginPage");
const { PageObjectManager } = require("./PageObject/PageObjectManager");
//Import the data kept as a FIXTURE
const { customTest } = require("./Utils/test-dataFixture");

customTest(
  "End to End Scenario - Data Driven Testing",
  async ({ browser, testDataInFixture }) => {
    //Create a browser context - Instance of a browser is opened
    const context = await browser.newContext();

    //Open a page in that browser instance
    const page = await context.newPage();

    //Create the object of LoginPage POM class
    //const loginPage = new LoginPage(page);
    const pageObjectManager = new PageObjectManager(page);

    const productName = "ZARA COAT 3";
    const product = page.locator(".card-body");
    const countryName = " India";
    const countryArea = page.locator(".ta-results");
    const rows = page.locator("tbody tr");

    //LOGIN PAGE - 1
    //Navigate to URL
    //await page.goto("https://rahulshettyacademy.com/client/");
    const loginPage = await pageObjectManager.getLoginPage();
    await loginPage.goToUrl();
    await loginPage.validLogin(
      testDataInFixture.username,
      testDataInFixture.password,
    );

    //DASHBOARD PAGE - 2
    const dashboardPage = await pageObjectManager.getDashboardPage();
    await dashboardPage.clickAddToCartBasedOnProductName(
      testDataInFixture.productName,
    );
    await dashboardPage.clickCartLink();

    //MY CART PAGE - 3
    const myCartPage = await pageObjectManager.getMyCartPage();
    await myCartPage.assertVisibilityTextZara();
    await myCartPage.clickCheckoutButton();

    //PaymentMethodPage - 3
    const paymentMethodPage = await pageObjectManager.getPaymentMethodPage();
    await paymentMethodPage.assertTextCreateCardnumberPresent();
    await paymentMethodPage.typeCreditCard();
    await paymentMethodPage.assertExpiryDateVisible();
    await paymentMethodPage.dropDownMonthSelect();
    await paymentMethodPage.dropDownYearSelect();
    await paymentMethodPage.assertCVVCodeTextPresent();
    await paymentMethodPage.typeCvvCodeEditBox();
    await paymentMethodPage.assertNameOnCardTextVisible();
    await paymentMethodPage.typeNameOncardEditBox();
    await paymentMethodPage.assertEmailText(testDataInFixture.username);
    await paymentMethodPage.chooseAutoSuggestionData(
      testDataInFixture.countryName,
      testDataInFixture.countryInitial,
    );
    await paymentMethodPage.clickPlaceOrderButton();

    //THANK YOU FOR THE ORDER - 4
    const thankYouPage = await pageObjectManager.getThankYouPage();
    await thankYouPage.assertTextThankYou();
    const orderId = await thankYouPage.getOrderId();
    await thankYouPage.clickOrderButton();

    //YOUR ORDER PAGE - 5
    const yourOrderPage = await pageObjectManager.getYourOrderPage();
    await yourOrderPage.iterateSpecificOrderClickViewsButton(orderId);

    //ORDER SUMMARY PAGE - 6
    const orderSummaryPage = await pageObjectManager.getOrderSummaryPage();
    await orderSummaryPage.assertOrderValeOrderSummaryPage(orderId);
  },
);
