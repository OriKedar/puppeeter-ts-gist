import puppeteer, { Page } from "puppeteer";
    

export async function getText(page: Page, selector: any) {
        await page.waitForSelector(selector, { visible: true });
        return page.$eval(selector, (el) => el.textContent);
    }

export async function sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

export async function addAuth(token: string) {
  return `'Authorization': 'Bearer ${token}'`
}