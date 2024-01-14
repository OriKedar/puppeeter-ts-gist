import {beforeAll, describe, it} from "@jest/globals";
import puppeteer from "puppeteer";
import { HomePage } from "../drivers/homePage";
import * as testData from "../utils/testData";
import { GistApi } from "../drivers/gistApi";

let browser: any;
let page: any;
let homeDriver: HomePage;
let gistApi: GistApi;


let testTime = new Date();
let testedGist: any

describe('Multipule files gist', () => {
    beforeAll(async () => {
      browser = await puppeteer.launch({headless: true});
      page = await browser.newPage();
      homeDriver = new HomePage({ page })
      gistApi = new GistApi()
    });
  
    afterAll(async () => {
      await gistApi.deleteGist(testedGist.id, testData.auth.oridis123)
      await browser.close()
    })
  
    it('Should create new complicated gist', async () => {
      let rawResponse = await gistApi.createNewGist(testData.gistFiles.mcf, testData.auth.oridis123, testTime);
      expect(rawResponse.status).toBe(201);
      testedGist = await rawResponse.json();
    });
  
    it('Should get tested gist', async () => {
      let rawResponse = await gistApi.getGistAnonumosly(testedGist.id);
      expect(rawResponse.status).toBe(200);
      let getedGist = await rawResponse.json();
      expect(getedGist.description).toContain(testTime.toString());
      expect(getedGist.files['README.md'].language).toBe('Markdown');
      expect(getedGist.files['code.ts'].language).toBe('TypeScript');
      expect(getedGist.files['test.txt'].language).toBe('Text');
    });
  
    it('Should get gist from Web', async () => {
      await page.goto(`https://gist.github.com/${testedGist.owner.login}/${testedGist.id}`, {waitUntil: 'networkidle2'});
      expect(await homeDriver.getNumberOfFiles()).toBe(3);
    });
  })