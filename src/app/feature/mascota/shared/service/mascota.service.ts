import { Injectable, EventEmitter } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Mascota } from '../model/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private notificarMascota = new EventEmitter<any>();

  constructor(
    protected http: HttpService
  ) { }

  get notificar():EventEmitter<any>{
    return this.notificarMascota;
  }

  public consultarMascotasPorIdUsuario(idUsuario: number){
    return this.http.doGet<Mascota[]>(`${environment.endpoint}/mascotas/usuario/${idUsuario}`, this.http.optsName("consultar mascotas del usuario"));
  }
}
