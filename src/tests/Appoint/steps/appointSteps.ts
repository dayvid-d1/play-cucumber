import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber'
import { fixture } from '../../../hooks/fixture'
import AppointPage from "../../../pages/Appoint/AppointPage"
import * as loginData from "../../../helper/util/test-data/Appoint/details.json"

let appointPage: AppointPage;
setDefaultTimeout(60 * 1000 * 2)

Given('user loads the appoint page', async function () {  
        appointPage = new AppointPage(fixture.page);
             
        appointPage.navigateToPage();
        fixture.loggger.info("Page loaded successfully!");   
});

When('the user selects the province', async function () {
        //appointPage.checkAccept();
        appointPage.selectProvince(loginData.provinceVal);
        appointPage.clickAccept();
});

When('the user selects the process', async function () {
        //appointPage.checkAccept();
        //appointPage.waitForRedirect();
        //appointPage.checkAccept();        
        //appointPage.selectProcess(loginData.processVal);
        //appointPage.clickAccept();
});

When('the user accepts the process', async function () {
        //appointPage.checkEnter();
        //appointPage.clickEnter();
});

When('the user makes the choice', async function () {
        //appointPage.clickChoice();
});

When('the user fills the data', async function () {
        //ap/pointPage.fillDocument(loginData.documentVal);
        //appointPage.fillName(loginData.nameVal);
        //appointPage.fillYear(loginData.yearVal);
        //appointPage.selectCountry(loginData.countryVal);
        //appointPage.clickAccept();
});

When('the user accepts the filled data', async function () {
        //appointPage.checkSearch();
        //appointPage.clickSearch();
});

Then('the user gets a warning', async function () {      
        //appointPage.checkWarning();
});
