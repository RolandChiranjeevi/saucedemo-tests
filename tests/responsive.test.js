const { By, until } = require('selenium-webdriver');

module.exports = async function(driver) {
  console.log("Responsive Design test startar...");
  const targetUrl = process.env.TARGET_URL || 'https://rolandchiranjeevi.github.io/saucedemo-site';
  console.log(`Testar URL: ${targetUrl}`);
  
  await driver.get(targetUrl);
  
  try {
    // Vänta på att sidan laddas (acceptera vilken titel som helst)
    await driver.wait(function() {
      return driver.getTitle().then(function(title) {
        return title.length > 0;
      });
    }, 10000);
    
    // Testa Desktop storlek
    await driver.manage().window().setRect({width: 1920, height: 1080});
    await driver.sleep(1000); // Vänta på resize
    
    let bodyElement = await driver.findElement(By.tagName('body'));
    let bodySize = await bodyElement.getSize();
    console.log(`✅ Desktop: Body storlek ${bodySize.width}x${bodySize.height}`);
    
    // Testa Tablet storlek
    await driver.manage().window().setRect({width: 768, height: 1024});
    await driver.sleep(1000);
    
    bodyElement = await driver.findElement(By.tagName('body'));
    bodySize = await bodyElement.getSize();
    console.log(`✅ Tablet: Body storlek ${bodySize.width}x${bodySize.height}`);
    
    // Testa Mobile storlek
    await driver.manage().window().setRect({width: 375, height: 667});
    await driver.sleep(1000);
    
    bodyElement = await driver.findElement(By.tagName('body'));
    bodySize = await bodyElement.getSize();
    console.log(`✅ Mobile: Body storlek ${bodySize.width}x${bodySize.height}`);
    
    // Återställ till desktop
    await driver.manage().window().setRect({width: 1920, height: 1080});
    
    console.log("✅ Responsive design test godkänd");
    
  } catch (error) {
    console.error("❌ Responsive test misslyckades:", error.message);
    throw error;
  }
  
  console.log("Responsive Design test klar!");
};
