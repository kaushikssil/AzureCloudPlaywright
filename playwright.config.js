// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",

  /* Maximum time one test case can run for.After 30 seconds that failure is shown.*/
  timeout: 30 * 1000,

  /* Used for assertions.*/
  expect: {
    timeout: 5000,
  },

  /* Run tests in files in parallel */
  //fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  //forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    //Browser to be used
    browserName: "chromium",

    headless: true,

    //Screenshot configuration
    screenshot: "only-on-failure",

    //Video Configurauin
    video: "retain-on-failure",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",

    //viewport: { width: 1920, height: 1080 },
  },

  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: "chromium",
  //     use: { ...devices["Desktop Chrome"] },
  //     retries: 2,
  //   },

  //   {
  //     name: "firefox",
  //     use: { ...devices["Desktop Firefox"] },
  //     retries: 2,
  //   },

  //   {
  //     name: "webkit",
  //     use: { ...devices["Desktop Safari"] },
  //     retries: 2,
  //   },
  // ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
