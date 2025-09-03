const fs = require('fs');
const path = require('path');
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { blue, green, red, yellow } = require('chalk'); // <--- ändrat

(async function runAllTests() {
  console.log(blue("Startar Chrome en gång för alla tester..."));
  
  // Setup Chrome options för CI/CD
  const chromeOptions = new chrome.Options();
  if (process.env.HEADLESS === 'true') {
    chromeOptions.addArguments('--headless');
    chromeOptions.addArguments('--no-sandbox');
    chromeOptions.addArguments('--disable-dev-shm-usage');
    console.log(yellow("Kör i headless-läge för CI/CD"));
  }
  
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();

  let passed = 0;
  let failed = 0;

  try {
    const testsPath = path.join(__dirname, 'tests');
    const files = fs.readdirSync(testsPath).filter(f => f.endsWith('.test.js'));

    for (const file of files) {
      console.log(yellow(`Kör test: ${file}`));
      const test = require(path.join(testsPath, file));

      try {
        await test(driver);
        console.log(green(`✅ Test klar: ${file}`));
        passed++;
      } catch (err) {
        console.log(red(`❌ Test misslyckades: ${file}`));
        console.error(red(err));
        failed++;
      }
    }

    console.log(blue("\nAlla tester klara!"));
    console.log(green(`Lyckade tester: ${passed}`));
    console.log(red(`Misslyckade tester: ${failed}`));
  } finally {
    await driver.quit();
  }
})();
