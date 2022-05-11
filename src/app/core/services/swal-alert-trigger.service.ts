import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalAlertTriggerService {

  constructor() { }

  public ejecutarSwalAlert(icono, titulo: string, texto: string){

    Swal.fire({
      icon: icono,
      title: titulo,
      text: texto
    });
  }

}
