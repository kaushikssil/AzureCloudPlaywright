class LoginPage {
  //Should contain all elements locator and action based function on those element
  //The constructor will have the locator values inside its body and a reference to the page fixture
  //Then the action based function needs to be generated for individual elements.
  //Export the class

  constructor(page) {
    this.page = page;
    this.username = this.page.locator("#userEmail");
    this.password = this.page.locator("#userPassword");
    this.login = this.page.locator("//input[@id='login']");
  }

  //Function to navigate to URL
  async goToUrl() {
    await this.page.goto("https://rahulshettyacademy.com/client/");
  }

  //Function to do valid login
  async validLogin(username, password) {
    await this.username.fill("");
    await this.username.fill(username);
    await this.password.fill(password);
    await this.login.click();
    await this.page.waitForLoadState("networkidle");
  }
}

module.exports = { LoginPage };
