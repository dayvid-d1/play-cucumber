import { BeforeAll, AfterAll, Before, After, BeforeStep, AfterStep } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { fixture } from "./fixture";
import { invokeBrowser, invokeContext } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";

const fs = require("fs-extra");
let browser: Browser;
let context: BrowserContext;

BeforeAll(async function (){
    getEnv();
    browser = await invokeBrowser();
    context = await invokeContext(browser);
    await context.clearCookies();
});

Before(async function({pickle}){    
    fixture.page = await context.newPage();
    fixture.loggger = createLogger(options(pickle.name));
});

BeforeStep(async function({pickleStep}) {
    const img = await fixture.page.screenshot({
        path: `./test-results/screenshots/${process.env.APPLICATION}/${process.env.BROWSER}/${pickleStep.id}-Before.png`,
        type: "png"
    });    
    await this.attach(img, "image/png")
});

AfterStep(async function({pickleStep}) {
    await fixture.page.pause();
    const img = await fixture.page.screenshot({
        path: `./test-results/screenshots/${process.env.APPLICATION}/${process.env.BROWSER}/${pickleStep.id}-After.png`,
        type: "png"
    });    
    await this.attach(img, "image/png")
});

After(async function (){
    
});

AfterAll(async function(){
    await fixture.page.close();      
    const videoPath = fixture.page.video().path();
    if(fs.existsSync(videoPath)) {
        this.attach(fs.readFileSync(videoPath,'base64'),'video/mp4');
    }
    await context.close();
    await browser.close();
});