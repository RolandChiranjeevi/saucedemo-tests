# Selenium Test Suite för SauceDemo

Detta projekt innehåller automatiserade tester för SauceDemo-webbplatsen med Selenium WebDriver.

## Vad projektet gör

- Automatiserade end-to-end tester för SauceDemo.com
- Login-funktionalitet
- Error-hantering
- CI/CD-integration med GitHub Actions

## Installation

```bash
npm install
```

## Körning av tester

### Lokalt (med synlig webbläsare)
```bash
npm run test:local
```

### Headless-läge (för CI/CD)
```bash
npm run test:headless
```

### Standard test-kommando
```bash
npm test
```

## Test-filer

- `login.test.js` - Testar normal login-funktionalitet
- `login-error.test.js` - Testar felhantering vid login
- `login-fail.test.js` - Testar misslyckad login
- `signup.test.js` - Testar registreringsfunktioner

## CI/CD Pipeline

Projektet använder GitHub Actions för automatisk testkörning:

- **Triggers**: Push och Pull Request till main branch
- **Scheduled runs**: Dagligen kl 08:00 UTC
- **Node versions**: Testar med Node.js 18 och 20
- **Browser**: Chrome i headless-läge
- **Artifacts**: Sparar screenshots och testresultat vid fel

## Undervisningssyfte

Detta projekt är skapat för att demonstrera:

1. **Selenium WebDriver** - Automatiserade webbtester
2. **CI/CD med GitHub Actions** - Kontinuerlig integration
3. **Error handling** - Robust felhantering i tester
4. **Multi-version testing** - Kompatibilitet med olika Node.js-versioner
5. **Scheduled testing** - Regelbunden övervakning av extern webbplats

## Hur CI/CD-pipelinen fungerar

1. **Kod push** → GitHub Actions startar
2. **Environment setup** → Node.js och Chrome installeras
3. **Dependencies** → npm ci installerar packages
4. **Test execution** → Selenium-tester körs headless
5. **Results** → Testresultat rapporteras
6. **Artifacts** → Screenshots sparas vid fel

## Utveckling

För att lägga till nya tester:

1. Skapa ny `.test.js`-fil i `tests/`-mappen
2. Exportera en async funktion som tar `driver` som parameter
3. Implementera testlogik med Selenium WebDriver
4. Testet körs automatiskt med `npm test`

## Teknologier

- **Node.js** - JavaScript runtime
- **Selenium WebDriver** - Webbautomatisering
- **Chrome/Chromedriver** - Webbläsare för tester
- **Chalk** - Färgad konsol-output
- **GitHub Actions** - CI/CD pipeline
