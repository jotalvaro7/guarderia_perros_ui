import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { RegistroIngreso } from '@mascota/shared/model/registro-ingreso/registro-ingreso';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroIngresoService {

  constructor(protected http: HttpService) { }

  
  public guardar(registroIngreso: RegistroIngreso){
    return this.http.doPost(`${environment.endpoint}/registro/ingreso`, registroIngreso, this.http.optsName("creando registro de ingreso de mascota"))
  }

  public eliminar(idMascota: number){
    return this.http.doDelete(`${environment.endpoint}/registro/ingreso/${idMascota}` , this.http.optsName("eliminar mascota"));
  }
}
