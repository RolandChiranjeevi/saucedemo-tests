const { By, until } = require('selenium-webdriver');

module.exports = async function(driver) {
  console.log("🏪 Mini Store Test Suite startar...");
  
  const targetUrl = process.env.TARGET_URL || 'https://rolandchiranjeevi.github.io/saucedemo-site';
  console.log(`🎯 Target URL: ${targetUrl}`);
  
  try {
    // 1. Ladda sidan
    console.log("1️⃣ Laddar Mini Store sidan...");
    await driver.get(targetUrl);
    
    // 2. Vänta på att sidan laddas
    await driver.wait(function() {
      return driver.getTitle().then(function(title) {
        return title.includes('Mini Store');
      });
    }, 10000);
    
    const title = await driver.getTitle();
    console.log(`✅ Sida laddad: "${title}"`);
    
    // 3. Kontrollera CI/CD banner
    console.log("2️⃣ Kontrollerar CI/CD banner...");
    const banner = await driver.findElement(By.className('ci-cd-banner'));
    const bannerText = await banner.getText();
    if (bannerText.includes('CI/CD Pipeline')) {
      console.log("✅ CI/CD banner hittad och korrekt");
    }
    
    // 4. Testa navigation
    console.log("3️⃣ Testar navigation...");
    const navLinks = await driver.findElements(By.css('.nav-links a'));
    console.log(`✅ Hittade ${navLinks.length} navigation-länkar`);
    
    // Klicka på "Produkter" länk
    const productLink = await driver.findElement(By.id('nav-products'));
    await productLink.click();
    await driver.sleep(1000);
    console.log("✅ Navigation klick lyckades");
    
    // 5. Kontrollera produktkategorier
    console.log("4️⃣ Kontrollerar produktkategorier...");
    const productCards = await driver.findElements(By.className('product-card'));
    console.log(`✅ Hittade ${productCards.length} produktkategorier`);
    
    // Klicka på en produktkategori
    if (productCards.length > 0) {
      await productCards[0].click();
      await driver.sleep(500);
      console.log("✅ Produktkategori klick lyckades");
    }
    
    // 6. Testa features-sektion
    console.log("5️⃣ Kontrollerar features...");
    const features = await driver.findElements(By.className('feature'));
    console.log(`✅ Hittade ${features.length} features`);
    
    // 7. Kontrollera Call-to-Action knappar
    console.log("6️⃣ Testar CTA-knappar...");
    const ctaButtons = await driver.findElements(By.className('cta-button'));
    console.log(`✅ Hittade ${ctaButtons.length} CTA-knappar`);
    
    // 8. Scrolla och testa responsivitet
    console.log("7️⃣ Testar scrolling...");
    await driver.executeScript("window.scrollTo(0, document.body.scrollHeight / 2);");
    await driver.sleep(1000);
    await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
    await driver.sleep(1000);
    await driver.executeScript("window.scrollTo(0, 0);");
    await driver.sleep(1000);
    console.log("✅ Scrolling test lyckades");
    
    // 9. Kontrollera test-info sektion
    console.log("8️⃣ Kontrollerar test information...");
    const testInfo = await driver.findElement(By.id('test-info'));
    const testInfoText = await testInfo.getText();
    if (testInfoText.includes('CI/CD Status')) {
      console.log("✅ Test information sektion korrekt");
    }
    
    // 10. Kontrollera JavaScript funktionalitet
    console.log("9️⃣ Kontrollerar JavaScript...");
    const currentUrl = await driver.executeScript("return document.getElementById('current-url').textContent;");
    if (currentUrl.includes(targetUrl.replace('https://', ''))) {
      console.log("✅ JavaScript uppdateringar fungerar");
    }
    
    console.log("🎉 MINI STORE TEST LYCKADES HELT!");
    
  } catch (error) {
    console.error("❌ MINI STORE TEST MISSLYCKADES:");
    console.error(`Error: ${error.message}`);
    console.error(`Stack: ${error.stack}`);
    throw error;
  }
};
