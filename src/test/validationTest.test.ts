import {beforeAll, describe, it} from "@jest/globals";
import * as testData from "../utils/testData";
import { GistApi } from "../drivers/gistApi";

let gistApi: GistApi;
const gistTime = new Date();



describe("Validation and Limits tests", () => {
    beforeAll(async () => {
      gistApi = new GistApi()
    });
  
    afterAll(async () => {
    });

    it('Shuold not get non-exsists gist', async () => {
        let rawResponse = await gistApi.getGistAnonumosly(testData.notValidGist.gistId);
        expect(rawResponse.status).toBe(404)
    });

    it('Shuold not create empty gist', async () => {
        let rawResponse = await gistApi.createNewGist(testData.notValidGist.nvf, testData.auth.oridis123, gistTime);  
        expect(rawResponse.status).toBe(422)
    });

    it('Shuold not create gist without auth', async () => {
        let rawResponse = await gistApi.createNewGist(testData.gistFiles.mcf, testData.notValidGist.Token, gistTime)
        expect(rawResponse.status).toBe(401)
    });

    it('Shuold limit gist size', async () => {
        let rawResponse = await gistApi.getGistAnonumosly(testData.oxfordeGist.gistId);
        let testedGist = await rawResponse.json();
        expect(rawResponse.status).toBe(200);
        expect(testedGist.truncated).toBeFalsy()
    });
})