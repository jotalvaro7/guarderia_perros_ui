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

  public consultarMascotasPorIdUsuario(idUsuario: Number){
    return this.http.doGet<Mascota[]>(`${environment.endpoint}/mascotas/usuario/${idUsuario}`, this.http.optsName("consultar mascotas del usuario"));
  }

  public consultarMascotaPorId(id: Number){
    return this.http.doGet<Mascota>(`${environment.endpoint}/mascotas/${id}`, this.http.optsName("consultar mascota por id"));
  }

  public guardar(mascota: Mascota){
    return this.http.doPost(`${environment.endpoint}/mascotas`, mascota, this.http.optsName("crear mascota"));
  }

  public actualizar(mascota: Mascota){
    return this.http.doPut(`${environment.endpoint}/mascotas/${mascota.id}`, mascota, this.http.optsName("editar mascota"));
  }

  public eliminar(id:Number){
    return this.http.doDelete(`${environment.endpoint}/mascotas/${id}`, this.http.optsName("eliminar mascota"))
  }
}
