import { Page } from "@playwright/test";
import Assert from "../../helper/wrapper/Assert";
import AppointWrapper from "../../helper/wrapper/AppointWrapper";


export default class AppointPage {
    private base: AppointWrapper
    private assert: Assert
    constructor(private page: Page) {
        this.base = new AppointWrapper(page);
        this.assert = new Assert(page);
    }

    private Elements = {        
        heading: "Sede electrónica",
        provinceLbl: "PROVINCIAS DISPONIBLES",
        processLbl: "TRÁMITES OFICINAS DE EXTRANJERÍA",
        choiceLbl: "PASAPORTE",
        documentLbl: "D.N.I.Campo obligatorio",
        nameLbl: "Nombre y apellidosCampo obligatorio",
        yearLbl: "Año de nacimientoCampo obligatorio",
        countryLbl: "País de nacionalidadCampo obligatorio",
        acceptBtn: "Aceptar",
        enterBtn: "Entrar",
        searchBtn: "Solicitar Cita",
        redirect: '**\/icpco\/citar\?p\=3\&locale\=es',
        warning: "Información: En este momento no hay citas disponibles"
    }
    
    async navigateToPage() {
        await this.base.goto(process.env.BASEURL);
        await this.checkHeading();
    }

    async waitForRedirect(){
        await this.base.waitForURL(this.Elements.redirect);
    }

    async selectProvince(province: string) {
        await this.base.select(this.Elements.provinceLbl,province);
    }

    async selectProcess(process: string) {        
        await this.base.select(this.Elements.processLbl,process);
    }

    async clickChoice() {
        await this.base.check(this.Elements.choiceLbl);
    }

    async fillDocument(document: string) {
        await this.base.fillInContains(this.Elements.documentLbl,document);
    }

    async fillName(name: string) {
        await this.base.fill(this.Elements.nameLbl,name);
    }
    
    async fillYear(year: string) {
        await this.base.fill(this.Elements.yearLbl,year);
    }

    async selectCountry(country: string) {
        await this.base.select(this.Elements.countryLbl,country);
    }

    async clickAccept() {
        await this.assert.assertButtonExists(this.Elements.acceptBtn);
        await this.base.clickButton(this.Elements.acceptBtn);
    }

    async clickEnter() {
        await this.assert.assertButtonExists(this.Elements.enterBtn);
        await this.base.clickButton(this.Elements.enterBtn);
    }

    async clickSearch() {
        await this.assert.assertButtonExists(this.Elements.searchBtn);
        await this.base.clickButton(this.Elements.searchBtn);
    }

    async checkHeading(){
        await this.assert.assertHeadingExists(this.Elements.heading);
    }

    async checkWarning() {
        await this.assert.assertWarning(this.Elements.warning);
    }
}