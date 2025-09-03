const { By, until } = require('selenium-webdriver');

module.exports = async function(driver) {
  console.log("🔍 BASIC TEST - Minimal funktionalitet");
  
  try {
    const targetUrl = process.env.TARGET_URL || 'https://google.com';
    console.log(`Testar: ${targetUrl}`);
    
    // Bara ladda sidan
    await driver.get(targetUrl);
    console.log("✅ Sidan laddad");
    
    // Hämta titel
    const title = await driver.getTitle();
    console.log(`✅ Titel: ${title}`);
    
    console.log("✅ BASIC TEST KLART!");
    
  } catch (error) {
    console.error("❌ BASIC TEST MISSLYCKADES:", error.message);
    throw error;
  }
};
