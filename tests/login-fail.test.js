// tests/login-fail.test.js
const { Builder, By, until } = require('selenium-webdriver');
const { red, green, blue } = require('chalk');

(async function runTest() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    console.log(blue("Startar test: ska misslyckas"));

    // Öppna sidan
    await driver.get('https://www.saucedemo.com/');

    // Hitta fälten
    const usernameInput = await driver.findElement(By.id('user-name'));
    const passwordInput = await driver.findElement(By.id('password'));
    const loginButton = await driver.findElement(By.id('login-button'));

    // Skriv felaktiga uppgifter
    await usernameInput.sendKeys('feluser');
    await passwordInput.sendKeys('felpass');
    await loginButton.click();

    // Vänta på ett felmeddelande som inte finns
    const errorMessage = await driver.wait(
      until.elementLocated(By.css('h3[data-test="non-existent-error"]')),
      3000
    );

    const text = await errorMessage.getText();

    console.log(green("✅ Felmeddelande visades: " + text));
  } catch (err) {
    console.log(red("❌ Testet misslyckades som förväntat!"));
    console.error(err.message);
  } finally {
    await driver.quit();
  }
})();
