export class Factura {
    nombreMascota: string;
    fechaIngreso: string;
    fechaSalida: string;
    totalTiempoEnGuarderia: string;
    precioAPagar: number;

    constructor(nombreMascota: string, fechaIngreso: string, fechaSalida: string,
        totalTiempoEnGuarderia: string, precioAPagar: number) {
        this.nombreMascota = nombreMascota,
            this.fechaIngreso = fechaIngreso,
            this.fechaSalida = fechaSalida,
            this.totalTiempoEnGuarderia = totalTiempoEnGuarderia,
            this.precioAPagar = precioAPagar;
    }
}