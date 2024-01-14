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

describe("Simple small gist test", () => {
    beforeAll(async () => {
      browser = await puppeteer.launch({headless: true});
      page = await browser.newPage();
      homeDriver = new HomePage({ page })
      gistApi = new GistApi()
    });
  
    afterAll(async () => {
      await browser.close()
      await gistApi.deleteGist(testedGist.id, testData.auth.oridis123)
    })

    it('Should create new simple gist', async () => {
      let rawResponse = await gistApi.createNewGist(testData.gistFiles.ssf, testData.auth.oridis123, testTime);
      expect(rawResponse.status).toBe(201);
      testedGist = await rawResponse.json();      
    });

    it('Should get tested gist', async () => {
        let rawResponse = await gistApi.getGistAnonumosly(testedGist.id);        
        expect(rawResponse.status).toBe(200)
        let getedGist = await rawResponse.json() 
        expect(getedGist.description).toContain(testTime.toString());
        expect(getedGist.files.testGist.content).toContain('single simple File');
    });

    it('Should get gist from Web', async () => {
        await page.goto(`https://gist.github.com/${testedGist.owner.login}/${testedGist.id}`, {waitUntil: 'networkidle2'});
        expect(await homeDriver.getNumberOfFiles()).toBe(1);
    });
});