import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Factura } from '../model/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(protected http: HttpService) { }


  public consultar(idMascota:Number){
    return this.http.doGet<Factura>(`${environment.endpoint}/cobrar/${idMascota}`, this.http.optsName("consultando la factura de cobro de la mascota"));
  }

}
