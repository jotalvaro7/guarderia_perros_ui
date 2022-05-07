export class Usuario {
    id: number;
    nombre: string;
    apellido: string;
    identificacion: string;
    numeroCelular: string;

    constructor(nombre: string, apellido: string, identificacion: string, numeroCelular: string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.identificacion = identificacion;
        this.numeroCelular = numeroCelular;
    }

}