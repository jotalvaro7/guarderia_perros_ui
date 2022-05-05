import { Injectable, EventEmitter } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';


@Injectable()
export class UsuarioService {


  private notificarGestion = new EventEmitter<any>();

  constructor(protected http: HttpService) { }

  get notificar(): EventEmitter<any> {
    return this.notificarGestion;
  }

  public consultar() {
    return this.http.doGet<Usuario[]>(`${environment.endpoint}/usuarios`, this.http.optsName('consultar usuarios'));
  }

  public consultarPorId(id: number) {
    return this.http.doGet<Usuario>(`${environment.endpoint}/usuarios/${id}`, this.http.optsName('consultar usuario por id'));
  }

  public guardar(usuario: Usuario) {
    return this.http.doPost(`${environment.endpoint}/usuarios`, usuario, this.http.optsName('crear usuario'));
  }

  public editar(usuario: Usuario) {
    return this.http.doPut(`${environment.endpoint}/usuarios/${usuario.id}`, usuario, this.http.optsName('editar usuario'));
  }

  public eliminar(id: number) {
    return this.http.doDelete(`${environment.endpoint}/usuarios/${id}`, this.http.optsName('eliminar usuario'));
  }


}
