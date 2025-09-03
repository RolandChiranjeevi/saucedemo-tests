const { By, until } = require('selenium-webdriver');

module.exports = async function(driver) {
  console.log("🧪 SIMPLE TEST - Testar bara grunderna");
  
  const targetUrl = process.env.TARGET_URL || 'https://rolandchiranjeevi.github.io/saucedemo-site';
  console.log(`Target URL: ${targetUrl}`);
  
  try {
    console.log("1. Försöker ladda sidan...");
    await driver.get(targetUrl);
    console.log("✅ Sidan laddad");
    
    console.log("2. Hämtar titel...");
    const title = await driver.getTitle();
    console.log(`✅ Titel: "${title}"`);
    
    console.log("3. Kollar body-element...");
    const body = await driver.findElement(By.tagName('body'));
    console.log("✅ Body-element hittat");
    
    console.log("4. Hämtar sidans URL...");
    const currentUrl = await driver.getCurrentUrl();
    console.log(`✅ Aktuell URL: ${currentUrl}`);
    
    console.log("✅ SIMPLE TEST LYCKADES!");
    
  } catch (error) {
    console.error("❌ SIMPLE TEST MISSLYCKADES:");
    console.error(`Error: ${error.message}`);
    console.error(`Stack: ${error.stack}`);
    throw error;
  }
};
