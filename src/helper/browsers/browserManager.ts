import { LaunchOptions, BrowserContextOptions, Browser, chromium, firefox, webkit } from "playwright-core"
import path = require('path');

const contextOptions: BrowserContextOptions = { 
    ignoreHTTPSErrors: true,
    //    storageState:getStorageState(),
    recordVideo: {
        dir: path.resolve(`test-results/videos/${process.env.APPLICATION}/${process.env.BROWSER}`),
        size: { width: 1920, height: 1080 }
    },
    viewport: null
}

const launchOptions: LaunchOptions = {
    headless: JSON.parse(process.env.HEADLESS),
    slowMo: 500
}

export const invokeBrowser = () => {
    const browserType = process.env.BROWSER;
    switch (browserType){
        case "chrome":
            return chromium.launch(launchOptions);
        case "firefox":
            return firefox.launch(launchOptions);
        case "webkit":
            return webkit.launch(launchOptions);
        default:
            throw new Error("Please set a proper browser");
    }
}

export const invokeContext = (browser: Browser) =>{
    return browser.newContext(contextOptions);
}

function getStorageState(): string | { cookies: { name: string; value: string; domain: string; path: string; expires: number; httpOnly: boolean; secure: boolean; sameSite: "Strict" | "Lax" | "None"; }[]; origins: { origin: string; localStorage: { name: string; value: string; }[]; }[]; } {
    return `src/helper/auth/${process.env.APPLICATION}/admin.json`;
}