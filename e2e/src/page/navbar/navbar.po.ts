import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/nav/div/a[1]'));
    linkUsuario = element(by.xpath('/html/body/app-root/app-navbar/nav/div/a[2]'));

    async clickBotonUsuario() {
        await this.linkUsuario.click();
    }
}
