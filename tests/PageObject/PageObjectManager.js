const { LoginPage } = require("../PageObject/LoginPage");
const { DashboardPage } = require("../PageObject/DashboardPage");
const { MyCartPage } = require("../PageObject/MyCartPage");
const { PaymentMethodPage } = require("../PageObject/PaymentMethodPage");
const { ThankYouPage } = require("../PageObject/ThankYouPage");
const { YourOrderPage } = require("../PageObject/YourOrderPage");
const { OrderSummaryPage } = require("../PageObject/OrderSummaryPage");
const { test, expect } = require("@playwright/test");

class PageObjectManager {
  constructor(page) {
    this.page = page;
    //Login Page - OBJECT
    this.loginPage = new LoginPage(this.page);
    //Dashboard Page - OBJECT
    this.dashboardPage = new DashboardPage(this.page);
    //My cart Page - OBJECT
    this.myCartPage = new MyCartPage(this.page);
    //PaymentMethodPage Page - OBJECT
    this.paymentMethodPage = new PaymentMethodPage(this.page);
    //ThankYouPage Page - OBJECT
    this.thankYouPage = new ThankYouPage(this.page);
    //YourOrderPage Page - OBJECT
    this.yourOrderPage = new YourOrderPage(this.page);
    //OrderSummaryPage page - OBJECT
    this.orderSummaryPage = new OrderSummaryPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }

  getMyCartPage() {
    return this.myCartPage;
  }

  getPaymentMethodPage() {
    return this.paymentMethodPage;
  }

  getThankYouPage() {
    return this.thankYouPage;
  }

  getYourOrderPage() {
    return this.yourOrderPage;
  }

  getOrderSummaryPage() {
    return this.orderSummaryPage;
  }
}

module.exports = { PageObjectManager };
