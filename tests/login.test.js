const { By, until } = require('selenium-webdriver');

module.exports = async function(driver) {
  console.log("Navigation test startar...");
  const targetUrl = process.env.TARGET_URL || 'https://rolandchiranjeevi.github.io/saucedemo-site';
  console.log(`Testar URL: ${targetUrl}`);
  
  await driver.get(targetUrl);
  
  try {
    // Vänta på att sidan laddas
    await driver.wait(until.titleContains('Mini Store'), 10000);
    
    // Testa basic navigation och scrolling
    console.log("Testar grundläggande navigation...");
    
    // Scrolla ner på sidan
    await driver.executeScript("window.scrollTo(0, 500);");
    await driver.sleep(1000);
    
    // Scrolla tillbaka upp
    await driver.executeScript("window.scrollTo(0, 0);");
    await driver.sleep(1000);
    
    // Kolla om det finns clickbara element
    const clickableElements = await driver.findElements(By.css('a, button, [onclick]'));
    console.log(`✅ Hittade ${clickableElements.length} clickbara element`);
    
    // Testa att klicka på första länken (om den finns)
    if (clickableElements.length > 0) {
      const firstLink = clickableElements[0];
      const linkText = await firstLink.getText();
      console.log(`🔗 Första länk: "${linkText}"`);
      
      // Bara klicka om det inte är en extern länk
      const href = await firstLink.getAttribute('href');
      if (href && !href.includes('http') || href.includes(targetUrl)) {
        try {
          await firstLink.click();
          await driver.sleep(2000);
          console.log("✅ Navigation click lyckades");
        } catch (e) {
          console.log("⚠️  Navigation click misslyckades (kan vara normalt)");
        }
      }
    }
    
    console.log("✅ Navigation test godkänd");
    
  } catch (error) {
    console.error("❌ Navigation test misslyckades:", error.message);
    throw error;
  }
  
  console.log("Navigation test klar!");
};
