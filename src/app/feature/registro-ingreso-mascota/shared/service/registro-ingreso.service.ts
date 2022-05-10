import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';

import { environment } from 'src/environments/environment';
import { IdMascota} from '@registro-ingreso-mascota/shared/model/idMascota';

@Injectable()
export class RegistroIngresoService {

  constructor(protected http: HttpService) { }


  public guardar(idMascota: IdMascota) {
    return this.http.doPost(`${environment.endpoint}/registro/ingreso`, idMascota, this.http.optsName('creando registro de ingreso de mascota'));
  }

  public eliminar(idMascota: number) {
    return this.http.doDelete(`${environment.endpoint}/registro/ingreso/${idMascota}`, this.http.optsName('eliminar mascota'));
  }
}
