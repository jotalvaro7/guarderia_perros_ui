import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificarRegistroMascotaEmitterService {

  private notificarRegistro = new EventEmitter<any>();
  private notificarEliminarRegistro = new EventEmitter<any>();

  constructor() { }

  get notificar(): EventEmitter<any> {
    return this.notificarRegistro;
  }

  get notificarEliminar(): EventEmitter<any> {
    return this.notificarEliminarRegistro;
  }

}
