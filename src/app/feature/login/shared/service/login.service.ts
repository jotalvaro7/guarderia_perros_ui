import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { CredencialesDeUsuario } from '../model/credencialesDeUsuario';

@Injectable()
export class LoginService {

  constructor(
    protected http: HttpService
  ) { }

 
  public obtenerToken(credencialesDeUsuario: CredencialesDeUsuario) {
    return this.http.doPost("/api/security/oauth/login", credencialesDeUsuario, this.http.optsName('obtener token'))
  }
}
