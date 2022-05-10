import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';

import { environment } from 'src/environments/environment';
import { RegistroIngresoMascota } from '@mascota/shared/model/mascota/registroIngresoMascota';

@Injectable()
export class RegistroIngresoService {

  constructor(protected http: HttpService) { }


  public guardar(registroIngresoMascota: RegistroIngresoMascota) {
    return this.http.doPost(`${environment.endpoint}/registro/ingreso`, registroIngresoMascota, this.http.optsName('creando registro de ingreso de mascota'));
  }

  public eliminar(idMascota: number) {
    return this.http.doDelete(`${environment.endpoint}/registro/ingreso/${idMascota}`, this.http.optsName('eliminar mascota'));
  }
}
