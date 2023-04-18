import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CompraProductoService } from "@compra-producto/shared/service/compra-producto.service";
import { Producto } from "@producto/shared/model/producto/producto";

@Component({
  selector: "app-compra-producto",
  templateUrl: "./compra-producto.component.html",
  styleUrls: ["./compra-producto.component.scss"],
})
export class CompraProductoComponent implements OnInit {
  public producto: Producto;
  public isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private compraProductoService: CompraProductoService
  ) { }

  ngOnInit(): void {
    const productoId = this.route.snapshot.paramMap.get("idProducto");
    const cantidad = this.route.snapshot.paramMap.get("cantidad");
    this.obtenerPrecio(productoId, cantidad);
  }

  private obtenerPrecio(productoId: string, cantidad: string) {
    this.compraProductoService.calcularPrecio(productoId, cantidad).subscribe((response) => {
      this.producto = response;
      console.log(this.producto);
    });
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  getStars(calificacion: number): string {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= calificacion) {
        stars += "★";
      } else {
        stars += "☆";
      }
    }
    return stars;
  }
}
