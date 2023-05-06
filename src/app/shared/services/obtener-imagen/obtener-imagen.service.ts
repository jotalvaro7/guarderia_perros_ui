import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObtenerImagenService {

  constructor(
    protected http:HttpService
  ) { }

  public obtenerImagenPorId(productoId: number): Observable<String> {
    return this.http.doGetImage(`/products/api/v1/image/${productoId}`);
  }
}
