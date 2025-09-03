module.exports = async function(driver) {
  console.log("Signup-test startar...");
  // Exempel, Saucedemo har ingen signup
  await driver.get('https://www.saucedemo.com/');
  console.log("Signup-test klar!");
};
