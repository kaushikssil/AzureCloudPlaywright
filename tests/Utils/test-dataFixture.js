const base = require("@playwright/test");

//Here "base" is extended with "test" object(test annotation) and returns a  customized property/annotation.
//Export the  customized property/annotation.

exports.customTest = base.test.extend({
  //Give the fixture name . This fixture will contain data for data driven testing
  //This data is a Javascript object
  testDataInFixture: {
    username: "kaushik.aryaan@gmail.com",
    password: "Test@1234",
    productName: "ZARA COAT 3",
    countryName: " India",
    countryInitial: "ind",
  },
});
