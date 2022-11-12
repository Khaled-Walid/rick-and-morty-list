import '@testing-library/jest-dom';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import puppeteer from 'puppeteer';
expect.extend({ toMatchImageSnapshot });
jest.setTimeout(30000);

const tests = [
  {
    name: 'looks good on 1920x1080',
    viewPort: { width: 1920, height: 1080 },
  },
  {
    name: 'looks good on 375x667',
    viewPort: { width: 375, height: 667 },
  },
];

describe('CharactersApp', () => {
  for (const test of tests) {
    const { name, viewPort } = test;
    it(name, async () => {
      const browser = await puppeteer.launch();
      try {
        const page = await browser.newPage();
        page.setDefaultTimeout(0);
        await page.setViewport(viewPort);
        await page.goto('http://localhost:3000/', {
          waitUntil: 'networkidle0',
        });
        page.on('requestfailed', (request) => {
          console.log(
            `url: ${request.url()}, errText: ${
              request.failure()?.errorText ?? 'requestfailed'
            }, method: ${request.method()}`,
          );
        });
        // Catch console log errors
        page.on('pageerror', (err) => {
          console.log(`Page error: ${err.toString()}`);
        });
        // Catch all console messages
        page.on('console', (msg) => {
          console.log('Logger:', msg.type());
          console.log('Logger:', msg.text());
          console.log('Logger:', msg.location());
        });

        const screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();
      } finally {
        await browser.close();
      }
    });
  }
});
