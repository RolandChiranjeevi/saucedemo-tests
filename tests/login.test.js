const { By, until } = require('selenium-webdriver');

module.exports = async function(driver) {
  console.log("Login-test startar...");
  const targetUrl = process.env.TARGET_URL || 'https://rolandchiranjeevi.github.io/saucedemo-site';
  console.log(`Testar URL: ${targetUrl}`);
  await driver.get(targetUrl);
  await driver.findElement(By.id('user-name')).sendKeys('standard_user');
  await driver.findElement(By.id('password')).sendKeys('secret_sauce');
  await driver.findElement(By.id('login-button')).click();

  await driver.wait(until.elementLocated(By.className('inventory_list')), 5000);
  console.log("Login-test klar!");
};
