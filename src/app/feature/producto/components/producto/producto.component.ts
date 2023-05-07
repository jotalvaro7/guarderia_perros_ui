import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Producto } from "@producto/shared/model/producto/producto";
import { ProductoService } from "@producto/shared/service/producto.service";
import { ObtenerImagenService } from "@shared/services/obtener-imagen/obtener-imagen.service";

@Component({
  selector: "app-producto",
  templateUrl: "./producto.component.html",
  styleUrls: ["./producto.component.scss"],
})
export class ProductoComponent implements OnInit {

  public selectedNumber: number;
  public imageUrl: string;
  public productos: Producto[];

  constructor(
    private productoService: ProductoService,
    private obtenerImageService: ObtenerImagenService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  private obtenerProductos() {
    this.productoService.obtenerProductos().subscribe((response) => {
      this.productos = response;
      this.productos.forEach((producto) => {
        producto.selectedNumber = 1;
      });
      this.obtenerImagen();
    });
  }

  private obtenerImagen() {
    this.productos.forEach((producto) => {
      this.obtenerImageService.obtenerImagenPorId(producto.bookDto.id).subscribe((base64Image: string) => {
        this.imageUrl = "data:image/jpeg;base64," + base64Image;
        producto.image = this.imageUrl;
      });
    });
  }

  actualizarSeleccion(nuevoValor: number, producto: Producto) {
    producto.selectedNumber = nuevoValor;
  }


  botonResumenCompra(idProducto: string, cantidad: number) {
    this.router.navigate([`comprar/${idProducto}/cantidad/${cantidad}`], {
      relativeTo: this.route,
    });
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
