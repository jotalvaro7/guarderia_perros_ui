import { browser, by, element } from 'protractor';
import { AppPage } from '../app.po';
import { UsuarioPage } from '../page/usuario/usuario.po';
import { NavbarPage } from '../page/navbar/navbar.po';
import { MascotaPage } from '../page/mascota/mascota.po';

describe('workspace-project Producto', () => {
    let page: UsuarioPage;
    let mascotaPage: MascotaPage;
    let appPage: AppPage;
    let navbar: NavbarPage;

    beforeEach(() => {
        appPage = new AppPage();
        page = new UsuarioPage();
        mascotaPage = new MascotaPage();
        navbar = new NavbarPage();
        navbar.clickBotonUsuario();
    });

    it('deberia crear un nuevo usuario', () => {
        browser.sleep(1000);
        page.botonAgregar();
        browser.sleep(1000);
        page.nombreUsuarioInput('Julio');
        browser.sleep(1000);
        page.apellidoUsuarioInput('Osorio');
        browser.sleep(1000);
        page.identificacionUsuarioInput('439583958304');
        browser.sleep(1000);
        page.numeroCelularUsuarioInput('83458437');
        browser.sleep(1000);
        page.botonConfirmarGuardar();
        browser.sleep(1000);
        page.botonOkUsuarioAgregado();
        browser.sleep(1000);

        element.all(by.tagName('body > app-root > app-usuario > mat-card > mat-card-content > table > tbody > tr:nth-child(4) > td:nth-child(5)')).each((row) => {
          row.getText().then((text) => {
              expect(text).toContain('83458437');
          });
        });
    });

    it('deberia editar un usuario', () => {
        appPage.navigateTo();
        navbar.clickBotonUsuario();
        browser.sleep(1000);
        page.botonActualizar(3);
        browser.sleep(1000);
        page.nombreUsuarioInput(' Cesar');
        browser.sleep(1000);
        page.apellidoUsuarioInput(' Otalvaro');
        browser.sleep(1000);
        page.botonConfirmarEditar();
        browser.sleep(1000);
        page.botonOkUsuarioEditado();
        browser.sleep(1000);

        element.all(by.tagName('body > app-root > app-usuario > mat-card > mat-card-content > table > tbody > tr:nth-child(4) > td:nth-child(2)')).each((row) => {
            row.getText().then((text) => {
                expect(text).toContain('Julio Cesar');
            });
        });

        element.all(by.tagName('body > app-root > app-usuario > mat-card > mat-card-content > table > tbody > tr:nth-child(4) > td:nth-child(3)')).each((row) => {
            row.getText().then((text) => {
                expect(text).toContain('Osorio Otalvaro');
            });
        });
    });


    it('deberia navegar a mascotas y crear una nueva mascota', () => {
        appPage.navigateTo();
        navbar.clickBotonUsuario();
        page.botonMascota(3);
        browser.sleep(2000);
        mascotaPage.botonAgregar();
        browser.sleep(1000);
        mascotaPage.nombremascotaInput('Max');
        browser.sleep(1000);
        mascotaPage.razaMascotaInput('Doberman');
        browser.sleep(1000);
        mascotaPage.pesoMascotaInput('10Kg');
        browser.sleep(1000);
        mascotaPage.botonConfirmarGuardar();
        browser.sleep(1000);
        mascotaPage.botonOkMascotaAgregada();
        browser.sleep(1000);

        element.all(by.tagName('body > app-root > app-mascota > mat-card > mat-card-content > table > tbody > tr:nth-child(1) > td:nth-child(3)')).each((row) => {
            row.getText().then((text) => {
                expect(text).toEqual('Doberman');
            });
        });
    });

    it('deberia navegar a mascotas y editar una mascota', () => {
        appPage.navigateTo();
        navbar.clickBotonUsuario();
        page.botonMascota(3);
        browser.sleep(2000);
        mascotaPage.botonActualizar(0);
        browser.sleep(1000);
        mascotaPage.nombremascotaInput('i');
        browser.sleep(1000);
        mascotaPage.botonConfirmarEditar();
        browser.sleep(1000);
        mascotaPage.botonOkMascotaEditada();

        browser.sleep(1000);

        element.all(by.tagName('body > app-root > app-mascota > mat-card > mat-card-content > table > tbody > tr:nth-child(1) > td:nth-child(2)')).each((row) => {
            row.getText().then((text) => {
                expect(text).toEqual('Maxi');
            });
        });
    });

    it('deberia navegar a mascotas y cobrar factura', () => {
        appPage.navigateTo();
        navbar.clickBotonUsuario();
        page.botonMascota(3);
        browser.sleep(5000);
        mascotaPage.botonFactura(0);
        browser.sleep(1000);
        mascotaPage.botonConfirmarFactura();
        browser.sleep(1000);
        mascotaPage.botonOkFacturaCobrada();
    });


    it('deberia eliminar un usuario', () => {
        appPage.navigateTo();
        navbar.clickBotonUsuario();
        browser.sleep(1000);
        page.botonEliminar(3);
        browser.sleep(1000);
        page.botonConfirmarEliminar();
        browser.sleep(1000);
        page.botonConfirmarEliminar();

        element.all(by.tagName('body > app-root > app-usuario > mat-card > mat-card-content > table > tbody > tr:nth-child(4) > td:nth-child(3)')).each((row) => {
            row.getText().then((text) => {
                expect(text).toContain('');
            });
        });

    });

    it('deberia llenar el formulario y limpiarlo', () => {
        appPage.navigateTo();
        navbar.clickBotonUsuario();
        browser.sleep(1000);
        page.botonAgregar();
        browser.sleep(1000);
        page.nombreUsuarioInput('Julio');
        browser.sleep(1000);
        page.apellidoUsuarioInput('Osorio');
        browser.sleep(1000);
        page.identificacionUsuarioInput('439583958304');
        browser.sleep(1000);
        page.numeroCelularUsuarioInput('83458437');
        browser.sleep(1000);
        page.botonLimpiarFormulario();
    });
});