import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificarCobroEmitterService {

  private notificarCobro = new EventEmitter<any>();

  constructor() { }

  get notificar(): EventEmitter<any> {
    return this.notificarCobro;
  }
}
