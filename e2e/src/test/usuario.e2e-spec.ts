import { browser } from 'protractor';
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
    });

    it('deberia editar un usuario', () => {
        appPage.navigateTo();
        navbar.clickBotonUsuario();
        browser.sleep(1000);
        page.botonActualizar(3);
        browser.sleep(1000);
        page.nombreUsuarioInput('Julio Cesar');
        browser.sleep(1000);
        page.apellidoUsuarioInput('Osorio');
        browser.sleep(1000);
        page.identificacionUsuarioInput('439583958304');
        browser.sleep(1000);
        page.numeroCelularUsuarioInput('83458437');
        browser.sleep(1000);
        page.botonConfirmarEditar();
        browser.sleep(1000);
        page.botonOkUsuarioEditado();
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
    });

    it('deberia navegar a mascotas y editar una mascota', () => {
        appPage.navigateTo();
        navbar.clickBotonUsuario();
        page.botonMascota(3);
        browser.sleep(2000);
        mascotaPage.botonActualizar(0);
        browser.sleep(1000);
        mascotaPage.nombremascotaInput('edit');
        browser.sleep(1000);
        mascotaPage.razaMascotaInput('edit');
        browser.sleep(1000);
        mascotaPage.pesoMascotaInput('10Kg edit');
        browser.sleep(1000);
        mascotaPage.botonConfirmarEditar();
        browser.sleep(1000);
        mascotaPage.botonOkMascotaEditada();
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