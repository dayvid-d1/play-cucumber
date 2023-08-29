import {expect, Page} from "@playwright/test";

export default class Assert{
    constructor(private page: Page){}

    async assertTitle(title: string){
        await expect(this.page).toHaveTitle(title);
    }

    async assertTitleContains(title: string){
        const pageTitle = await this.page.title();
        expect(pageTitle).toContain(title);
    }

    async assertURL(url: string){
        await expect(this.page).toHaveURL(url);
    }

    async assertURLContains(text: string){
        const pageURL = this.page.url();
        expect(this.page).toContain(text)
    }

    async assertButtonExists(text: string){
        expect(this.page.getByRole('button', { name: text })).toBeVisible;
    }








    
    async assertWarning(warning: string){
        const title = await this.page.title();
        expect(this.page.getByText(warning)).toBeVisible;
    }
    

    async assertHeadingExists(heading: string){
        const title = await this.page.title();
        expect(this.page.getByRole('heading', { name: heading })).toBeVisible;
    }
}