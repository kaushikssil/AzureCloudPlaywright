const { test, expect } = require("@playwright/test");

test("@Web End to End Scenario", async ({ browser }) => {
  //Create a browser context - Instance of a browser is opened
  const context = await browser.newContext();

  //Open a page in that browser instance
  const page = await context.newPage();

  const productName = "ZARA COAT 3";
  const product = page.locator(".card-body");
  const countryName = " India";
  const countryArea = page.locator(".ta-results");
  const rows = page.locator("tbody tr");

  //LOGIN PAGE - 1
  //Navigate to URL
  await page.goto("https://rahulshettyacademy.com/client/");

  //Before typing clear the email field
  //locator() - we can pass xpath or css as its argument
  await page.locator("#userEmail").fill("");

  //Type on the email field
  await page.locator("#userEmail").fill("kaushik.aryaan@gmail.com");

  //Type on the password field
  await page.locator("#userPassword").fill("Test@1234");

  //Click on Sign in button
  await page.locator("//input[@id='login']").click();

  //PRODUCT PAGE - 2
  //Wait for the netword calls to be over on clicking the SIGN IN button
  await page.waitForLoadState("networkidle");

  //OR WE CAN ALSO WAIT FOR A SPECIFIC PRODUCT IN PRODUCT PAGE
  //Show Error: strict mode violation as we are waiting for three elemnts having the same locator value
  //We can wait for 1 element
  //await page.locator(".card-body").waitFor();
  await product.first().waitFor();

  //Get text of all products present in Product Page 2
  const allProductText = await page.locator(".card-body b").allTextContents();
  console.log(allProductText);

  //Find out elements having the locator value ".card-body"
  const numOfElementsWithSameLocatorVal = await product.count();
  console.log(numOfElementsWithSameLocatorVal);
  for (let i = 0; i < numOfElementsWithSameLocatorVal; i++) {
    const itemText = await product.nth(i).locator("b").textContent();
    console.log(itemText);

    if (itemText === productName) {
      await product.nth(i).locator("//button[text() = ' Add To Cart']").click();
      break;
    }
  }

  //Click on the CART menu button
  await page.locator("[routerlink*='cart']").click();

  //MY CART PAGE - 3
  //Wait an elemet to make the script execution safe
  await page.locator("div li").first().waitFor();

  //Assert that ZARA COAT 3 IS PRESENT IN THE MY CART PAGE
  // //"h3:has.text('ZARA COAT 3') - css Selectoe
  //h3 is the html tag which has a inner text as "ZARA COAT 3"
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  console.log(bool);
  //await page.pause();

  //Click on the CHECK OUT button
  //text = Checkout - cssSelector
  //If a inner text is present in an element , we can use text = checkout
  await page.locator("text = Checkout").click();

  //PAYMENT FILL FORM PAGE - 3
  await page.waitForLoadState("load");

  //Assert thet the text "CREDIT CARD NUMBER" is present
  await expect(page.locator(".title").first()).toHaveText(
    "Credit Card Number ",
  );

  //Clear and type the credit card number
  await page.locator(".field input.text-validated").fill("");
  await page.locator(".field input.text-validated").fill("4323123454234534");

  //Assert the EXPIRY DATE IS VISIBLE
  expect(await page.locator("text=Expiry Date ").isVisible()).toBeTruthy();

  //Click on the month drop down created by SELECT tag. Select 03 as the month from the options
  const month = page.locator("select.ddl").first();
  await month.selectOption("03");

  //Click on the year drop down created by SELECT tag. Select 24 as the year from the options
  const year = page.locator("select.ddl").last();
  await year.selectOption("24");

  //Assert the CVV Code text is present
  const textCVV = await page.locator(".small .title").nth(1).textContent();
  console.log(textCVV);
  expect(textCVV).toContain("CVV Code"); //Su string value is asserted

  //Type on CVV Code edit box
  await page.locator(".small .txt").first().fill("213");

  //Assert that the text NAME ON CARD is visible
  expect(await page.locator("text=Name on Card ").isVisible()).toBeTruthy();

  //Type on Name on card field
  await page.locator(".field .txt").nth(2).fill("Kaushik Mukherjee");

  //Assert that the email 'kaushik.aryaan@gmail.com' is present  - This email is graded
  await expect(page.locator(".user__name [type = 'text']").first()).toHaveText(
    "kaushik.aryaan@gmail.com",
  );

  //Working with SELECT COUNTRY which shows autosuggestion - for autosuggestion do not use the fill() method
  //await page.locator("[placeholder='Select Country']").fill("ind");
  await page.locator("[placeholder='Select Country']").pressSequentially("ind");

  //Wait for the auto suggestion drop down to come
  await countryArea.waitFor();

  //Iterate over the element which has the locator value as ".ta-results" and go to button html tag and pick up the country text
  //Find number of button html tag which are child of SECTION tag having value ".ta-results"
  const numOfCountriesWithINDSubString = await countryArea
    .locator("button")
    .count();
  console.log(numOfCountriesWithINDSubString);
  for (let i = 0; i < numOfCountriesWithINDSubString; i++) {
    const actualCountry = await countryArea
      .locator("button")
      .nth(i)
      .textContent();
    if (actualCountry == countryName) {
      await countryArea.locator("button").nth(i).click();
      break;
    }
  }

  //Click on PLACE ORDER button
  await page.locator(".action__submit").click();

  //THAN YOU FOR THE ORDER - 4
  await page.waitForLoadState("networkidle");

  //Assert that the element has the text ' Thankyou for the order. '
  expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  //Get the ORDER ID of ZARA COAT 3
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log("The order id is " + orderId);

  //Click on ORDER menu mink
  await page.locator("button[routerlink*='myorder']").click();

  //YOUR ORDER PAGE - 5
  //Wait for the locator value "tbody"
  await page.locator("tbody").waitFor();

  //Iterate over rows and find the same orderId in line 155 is present in this page . If Present click on VIEWS button corresponding to that order
  for (let i = 0; i < (await rows.count()); i++) {
    //Get the actual order id
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      //Click ON VIEWS button
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  //ORDER SUMMARY PAGE - 6
  //Assert that the same order id is present in THANK YOU FOR ORDER PAGE
  //Assert that the same order is there in ORDER SUMMARY as in Thank you for Order page
  const orderNum = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderNum)).toBeTruthy();
});
