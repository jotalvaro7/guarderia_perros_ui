import { Injectable, EventEmitter } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import {Usuario} from '../model/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private notificarGestion = new EventEmitter<any>();

  constructor(protected http: HttpService) { }

  get notificar(): EventEmitter<any>{
    return this.notificarGestion;
  }

  public consultar(){
    return this.http.doGet<Usuario[]>(`${environment.endpoint}/usuarios`, this.http.optsName('consultar usuarios'));
  }

  public consultarPorId(id:number){
    return this.http.doGet<Usuario>(`${environment.endpoint}/usuarios/${id}`, this.http.optsName('consultar usuario por id'));
  }

  public guardar(usuario: Usuario){
    return this.http.doPost(`${environment.endpoint}/usuarios`, usuario, this.http.optsName('crear usuario'));
  }

  public eliminar(id:Number){
    return this.http.doDelete(`${environment.endpoint}/usuarios/${id}`, this.http.optsName('eliminar usuario'));
  }


}
