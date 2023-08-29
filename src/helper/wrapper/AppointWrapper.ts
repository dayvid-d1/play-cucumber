import {Locator, Page} from "@playwright/test";

export default class AppointWrapper{
    constructor(private page:  Page){}

    async goto(url: string) {
        await this.page.goto(url,{
            waitUntil: "domcontentloaded"
        });
    }

    async waitForURL(url: string){
        await this.page.waitForURL(url,{
           waitUntil: "domcontentloaded"
       });;
    }  

    async clickButton(button: string){
        const locator = this.page.getByRole('button', { name: button });
        await locator.waitFor({
            state: "visible"
        });
        await locator.click({force: true});
   }  

    async select(label: string, selection: string){
        const locator = this.page.getByLabel(label);
        await locator.waitFor({
            state: "visible"
        });        
        await locator.click({force: true});
        await locator.selectOption(selection)
        await locator.dblclick();
    }

    async fill(label: string, text: string){
        const locator = this.page.getByLabel(label);
        await locator.waitFor({
            state: "visible"
        });
        await locator.fill(text,{force: true});
    }

    async fillInContains(label: string, text: string){
        const locator = this.page.getByLabel(label, { exact: false });
        await locator.waitFor({
            state: "visible"
        });
        await locator.fill(text,{force: true});
    }

    async check(label: string){
        const locator = this.page.getByLabel(label);
        await locator.waitFor({
            state: "visible"
        });
        await locator.check({force: true});
    }
}