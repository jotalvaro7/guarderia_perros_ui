import { by, element } from 'protractor';

export class UsuarioPage {


    async nombreUsuarioInput(nombre: string) {
        await element(by.id('nombres')).sendKeys(nombre);
    }

    async apellidoUsuarioInput(apellido: string) {
        await element(by.id('apellido')).sendKeys(apellido);
    }

    async identificacionUsuarioInput(identificacion: string) {
        await element(by.id('identificacion')).sendKeys(identificacion);
    }

    async numeroCelularUsuarioInput(numeroCelular: string) {
        await element(by.id('numeroCelular')).sendKeys(numeroCelular);
    }

    async botonAgregar() {
        await element(by.id('agregarUsuario')).click();
    }

    async botonConfirmarGuardar() {
        await element(by.id('botonConfirmarGuardar')).click();
    }

    async botonOkUsuarioAgregado() {
        await element(by.className('swal2-confirm swal2-styled')).click();
    }

    async botonActualizar(id: number) {
        await element(by.id('botonEditar-' + id)).click();
    }

    async botonConfirmarEditar() {
        await element(by.id('botonConfirmarEditar')).click();
    }

    async botonOkUsuarioEditado() {
        await element(by.className('swal2-confirm swal2-styled')).click();
    }

    async botonMascota(id: number) {
        await element(by.id('botonMascota-' + id)).click();
    }

    async botonEliminar(id: number) {
        await element(by.id('eliminarButton-' + id)).click();
    }

    async botonConfirmarEliminar() {
        await element(by.className('swal2-confirm btn btn-success')).click();
    }

    async botonLimpiarFormulario() {
        await element(by.id('botonLimpiarFormulario')).click();
    }
}