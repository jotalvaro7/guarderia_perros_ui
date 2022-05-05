import { by, element } from 'protractor';

export class MascotaPage {

    async nombremascotaInput(nombre: string) {
        await element(by.id('nombre')).sendKeys(nombre);
    }

    async razaMascotaInput(apellido: string) {
        await element(by.id('raza')).sendKeys(apellido);
    }

    async pesoMascotaInput(identificacion: string) {
        await element(by.id('peso')).sendKeys(identificacion);
    }

    async botonAgregar() {
        await element(by.id('agregarMascota')).click();
    }

    async botonConfirmarGuardar() {
        await element(by.id('botonConfirmarGuardar')).click();
    }

    async botonOkMascotaAgregada() {
        await element(by.className('swal2-confirm swal2-styled')).click();
    }

    async botonActualizar(id: number) {
        await element(by.id('botonEditar-' + id)).click();
    }

    async botonConfirmarEditar() {
        await element(by.id('botonConfirmarEditar')).click();
    }

    async botonOkMascotaEditada() {
        await element(by.className('swal2-confirm swal2-styled')).click();
    }

    async botonFactura(id: number) {
        await element(by.id('botonFactura-' + id)).click();
    }

    async botonConfirmarFactura() {
        await element(by.id('botonConfirmarFactura')).click();
    }

    async botonOkFacturaCobrada() {
        await element(by.className('swal2-confirm swal2-styled')).click();
    }
}