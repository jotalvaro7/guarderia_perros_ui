import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { Producto } from "@producto/shared/model/producto/producto";
import { ProductoService } from "@producto/shared/service/producto.service";

@Component({
  selector: "app-producto",
  templateUrl: "./producto.component.html",
  styleUrls: ["./producto.component.scss"],
})
export class ProductoComponent implements OnInit {
  columnas: string[] = [
    "#",
    "Titulo",
    "Autor",
    "Calificación",
    "Cantidad",
    "Precio",
    "Comprar",
  ];
  numbers: number[] = [1, 2, 3, 4, 5];
  selectedNumber: number;

  public productos: Producto[];
  public dataSource: any;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.obtenerProductos().subscribe((response) => {
      this.productos = response;
      this.productos.forEach((producto) => {
        producto.selectedNumber = 1;
      });
      this.dataSource = new MatTableDataSource(this.productos);
      this.dataSource.paginator = this.paginator;
    });
  }

  botonResumenCompra(idProducto: string, cantidad: string) {
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
