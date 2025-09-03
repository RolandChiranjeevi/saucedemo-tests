const { By, until } = require('selenium-webdriver');

module.exports = async function(driver) {
  console.log("Login-test startar...");
  await driver.get('https://www.saucedemo.com/');
  await driver.findElement(By.id('user-name')).sendKeys('standard_user');
  await driver.findElement(By.id('password')).sendKeys('secret_sauce');
  await driver.findElement(By.id('login-button')).click();

  await driver.wait(until.elementLocated(By.className('inventory_list')), 5000);
  console.log("Login-test klar!");
};
