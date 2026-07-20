const { test, expect } = require("@playwright/test");
//Spec file level parallel behaviour
//Spec file level parallel behaviour iverrides the global configuraion
//We use serial mode when the test cases are related or interconnected
//test.describe.configure({ mode: "serial" });\
//We use parallel mode when the test cases are independent
//test.describe.configure({ mode: "parallel" });

test("Test Case 1", async () => {
  console.log("Test Case 1");
});

test("Test Case 2", async () => {
  console.log("Test Case 2");
});

test("Test Case 3", async () => {
  console.log("Test Case 3");
});
