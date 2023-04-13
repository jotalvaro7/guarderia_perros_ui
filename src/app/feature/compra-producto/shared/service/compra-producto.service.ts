import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { Producto } from "@producto/shared/model/producto/producto";
import { Observable } from "rxjs";

@Injectable()
export class CompraProductoService {
  constructor(protected http: HttpService) {}

  public calcularPrecio(productoId: string,cantidad: string): Observable<Producto> {
    return this.http.doGet<Producto>(`/products/api/v1/listar/${productoId}/cantidad/${cantidad}`,
    this.http.optsName(
        "obtener el precio del producto por el id y la cantidad"
      )
    );
  }
}
