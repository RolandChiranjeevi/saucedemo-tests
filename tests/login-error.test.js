// tests/login-error.test.js
const { By, until } = require('selenium-webdriver');
const { red, green, blue } = require('chalk');

module.exports = async function(driver) {
  console.log(blue("Startar test: felmeddelande vid inloggning"));

  // Öppna sidan
  await driver.get('https://www.saucedemo.com/');

  // Hitta username och password fälten
  const usernameInput = await driver.findElement(By.id('user-name'));
  const passwordInput = await driver.findElement(By.id('password'));
  const loginButton = await driver.findElement(By.id('login-button'));

  // Skriv felaktiga uppgifter
  await usernameInput.sendKeys('feluser');
  await passwordInput.sendKeys('felpass');
  await loginButton.click();

  // Vänta på att felmeddelandet syns
  const errorMessage = await driver.wait(
    until.elementLocated(By.css('h3[data-test="error"]')),
    5000
  );

  const text = await errorMessage.getText();
  
  if (text.includes('Epic sadface')) {
    console.log(green("✅ Felmeddelande visas korrekt"));
  } else {
    console.log(red("❌ Felmeddelande visades inte som förväntat"));
    throw new Error('Felmeddelande visades inte');
  }
};
