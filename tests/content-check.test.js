const { By, until } = require('selenium-webdriver');

module.exports = async function(driver) {
  console.log("Content Check test startar...");
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
    
    // Kontrollera att viktiga texter finns
    const pageSource = await driver.getPageSource();
    
    const expectedTexts = [
      'Mini Store',
      'barnkläder', 
      'secondhand',
      'hållbara'
    ];
    
    let foundTexts = 0;
    for (const text of expectedTexts) {
      if (pageSource.toLowerCase().includes(text.toLowerCase())) {
        console.log(`✅ Hittade text: "${text}"`);
        foundTexts++;
      } else {
        console.log(`⚠️  Kunde inte hitta text: "${text}"`);
      }
    }
    
    if (foundTexts >= 2) {
      console.log(`✅ Content check godkänd: ${foundTexts}/${expectedTexts.length} texter hittade`);
    } else {
      throw new Error(`Endast ${foundTexts}/${expectedTexts.length} förväntade texter hittades`);
    }
    
    // Kontrollera att det finns länkar
    const links = await driver.findElements(By.tagName('a'));
    console.log(`✅ Hittade ${links.length} länkar på sidan`);
    
    // Kontrollera att det finns bilder
    const images = await driver.findElements(By.tagName('img'));
    console.log(`✅ Hittade ${images.length} bilder på sidan`);
    
  } catch (error) {
    console.error("❌ Content check test misslyckades:", error.message);
    throw error;
  }
  
  console.log("Content Check test klar!");
};
