const puppeteer = require('puppeteer');
const { checkAndGenerate, generateText } = require('./util');

test('should output name and age', () => {
  const text = generateText('JD Gomez', 44);
  expect(text).toBe('JD Gomez (44 years old)');
});

test('should output data-less string', () => {
  const text = generateText('', null);
  expect(text).toBe(' (null years old)');

  const text2 = generateText();
  expect(text2).toBe('undefined (undefined years old)');
});

test('should generate a valid text output', () => {
  const text = checkAndGenerate('JD Gomez', 44);
  expect(text).toBe('JD Gomez (44 years old)');
});

test('should create an element with text and correct class', async () => {
  const browser = await puppeteer.launch({
    headless: true,
    // slowMo: 10,
    // args: ['--window-size=1920,1080'],
  });
  const page = await browser.newPage();
  await page.goto('file:///Users/jdgomezb/Projects/Frontend/javascript-in-depth/testing/index.html');

  await page.click('input#name');
  await page.type('input#name', 'JD Gomez');
  await page.click('input#age');
  await page.type('input#age', '44');
  await page.click('#btnAddUser');
  
  const addedLI = await page.$eval('.user-item', el => el.textContent);
  expect(addedLI).toBe('JD Gomez (44 years old)');
}, 10000);
