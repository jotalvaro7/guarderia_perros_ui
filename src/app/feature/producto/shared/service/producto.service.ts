import { Injectable } from '@angular/core';
import { HttpService} from '@core/services/http.service';
import { Producto } from '../model/producto/producto';
import { Observable } from 'rxjs';

@Injectable()
export class ProductoService {

  constructor(
    protected http: HttpService
  ) { }


  public obtenerProductos(): Observable<Producto[]>{
    return this.http.doGet<Producto[]>("/products/api/v1/listar", this.http.optsName('obtener productos'));
  }


}
