const fs = require('fs');
const path = require('path');
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const { blue, green, red, yellow } = require('chalk'); // <--- ändrat

(async function runAllTests() {
  console.log(blue("Startar Chrome en gång för alla tester..."));
  
  let driver;
  
  try {
    // Försök Firefox först i CI-miljö
    if (process.env.HEADLESS === 'true') {
      console.log(blue("Försöker starta Firefox WebDriver för CI..."));
      const firefoxOptions = new firefox.Options();
      firefoxOptions.addArguments('--headless');
      firefoxOptions.addArguments('--no-sandbox');
      firefoxOptions.addArguments('--disable-dev-shm-usage');
      firefoxOptions.addArguments('--width=1920');
      firefoxOptions.addArguments('--height=1080');
      
      try {
        driver = await new Builder()
          .forBrowser('firefox')
          .setFirefoxOptions(firefoxOptions)
          .build();
        
        console.log(green("✅ Firefox WebDriver startad framgångsrikt"));
      } catch (firefoxError) {
        console.log(yellow("⚠️  Firefox misslyckades, försöker Chrome..."));
        console.log("Firefox error:", firefoxError.message);
        
        // Fallback till Chrome
        const chromeOptions = new chrome.Options();
        chromeOptions.addArguments('--headless=new');
        chromeOptions.addArguments('--no-sandbox');
        chromeOptions.addArguments('--disable-dev-shm-usage');
        chromeOptions.addArguments('--disable-gpu');
        chromeOptions.addArguments('--disable-extensions');
        chromeOptions.addArguments('--window-size=1920,1080');
        
        driver = await new Builder()
          .forBrowser('chrome')
          .setChromeOptions(chromeOptions)
          .build();
        
        console.log(green("✅ Chrome WebDriver startad som fallback"));
      }
    } else {
      // Lokalt - använd Chrome som vanligt
      console.log(blue("Försöker starta Chrome WebDriver lokalt..."));
      driver = await new Builder()
        .forBrowser('chrome')
        .build();
      
      console.log(green("✅ Chrome WebDriver startad framgångsrikt"));
    }
    
  } catch (startupError) {
    console.error(red("❌ STARTUP FAILURE: Kunde inte starta Chrome WebDriver"));
    console.error(red("Error details:", startupError.message));
    console.error(red("Stack trace:", startupError.stack));
    
    // Försök med mer debugging info
    console.log(yellow("Debugging info:"));
    console.log("- Node version:", process.version);
    console.log("- Platform:", process.platform);
    console.log("- HEADLESS env:", process.env.HEADLESS);
    
    process.exit(1);
  }

  let passed = 0;
  let failed = 0;

  try {
    const testsPath = path.join(__dirname, 'tests');
    const files = fs.readdirSync(testsPath).filter(f => f.endsWith('.test.js'));

    for (const file of files) {
      console.log(yellow(`Kör test: ${file}`));
      const test = require(path.join(testsPath, file));

      try {
        await test(driver);
        console.log(green(`✅ Test klar: ${file}`));
        passed++;
      } catch (err) {
        console.log(red(`❌ Test misslyckades: ${file}`));
        console.error(red(err));
        failed++;
      }
    }

    console.log(blue("\nAlla tester klara!"));
    console.log(green(`Lyckade tester: ${passed}`));
    console.log(red(`Misslyckade tester: ${failed}`));
  } finally {
    if (driver) {
      try {
        await driver.quit();
        console.log(blue("Chrome WebDriver stängd"));
      } catch (quitError) {
        console.error(red("Varning: Problem att stänga WebDriver:", quitError.message));
      }
    }
  }
})();
