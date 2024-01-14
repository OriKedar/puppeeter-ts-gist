import { Page } from "puppeteer"
import * as selectors from "../utils/selectors";
import * as driverUtils from "../utils/driverUtils";


export class HomePage {
    private page: Page;

    constructor(optins: {page: Page}) {
        this.page = optins.page
    }

    getGistsList = async() => {
        let gists;
        gists = await this.page.$$(selectors.homePage.gistSnippet);
        
        console.log(`gists length == ${gists.length}`);
        return gists
    }

    getBanner = async () => {
        await this.page.waitForSelector(selectors.homePage.banner);
        console.log('get Banner - pass')
    }

    openFirstGist = async () => {
        let ele = await this.page.$$(selectors.homePage.gistBody);
        await ele[0].click();
        
        await page.waitForNavigation();
        await this.page.click(selectors.homePage.gistBody);
    }

    getNumberOfFiles = async () => {
        const fileContanors = await this.page.$$('[class="js-gist-file-update-container js-task-list-container file-box"]');
        return fileContanors.length
    }

    getGistContent = async () => {
        return await driverUtils.getText(this.page, selectors.gistPage.gistBody)
    }

    openGistById = async (userName: string, gistId: string) => {
        await this.page.goto(`https://gist.github.com/${userName}/${gistId}`, {waitUntil: 'networkidle2'});
    }
}