const { By, until } = require('selenium-webdriver');

module.exports = async function(driver) {
  console.log("Page Load test startar...");
  const targetUrl = process.env.TARGET_URL || 'https://rolandchiranjeevi.github.io/saucedemo-site';
  console.log(`Testar URL: ${targetUrl}`);
  
  await driver.get(targetUrl);
  
  // Vänta på att sidan laddas
  await driver.wait(until.titleContains('Mini Store'), 10000);
  
  // Kontrollera att titel finns
  const title = await driver.getTitle();
  console.log(`Sida titel: ${title}`);
  
  // Kontrollera att grundläggande element finns
  try {
    // Kolla om det finns någon header eller navigation
    const bodyElements = await driver.findElements(By.tagName('body'));
    if (bodyElements.length === 0) {
      throw new Error('Ingen body-tag hittades');
    }
    
    console.log("✅ Sidan laddades korrekt");
    console.log("✅ Basic HTML-struktur verifierad");
    
  } catch (error) {
    console.error("❌ Page load test misslyckades:", error.message);
    throw error;
  }
  
  console.log("Page Load test klar!");
};
