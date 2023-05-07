import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CompraProductoService } from "@compra-producto/shared/service/compra-producto.service";
import { Producto } from "@producto/shared/model/producto/producto";
import { ObtenerImagenService } from "@shared/services/obtener-imagen/obtener-imagen.service";

@Component({
  selector: "app-compra-producto",
  templateUrl: "./compra-producto.component.html",
  styleUrls: ["./compra-producto.component.scss"],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', overflow: 'hidden'})),
      state('expanded', style({ height: '*', overflow: 'hidden'})),
      transition('collapsed <=> expanded', [animate('300ms ease-in-out')])
    ])
  ]
})
export class CompraProductoComponent implements OnInit {
  public producto: Producto;
  public isFavorite: boolean = false;
  public image: string;
  hiddenTextVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private compraProductoService: CompraProductoService,
    private obtenerImageService: ObtenerImagenService
  ) {}

  ngOnInit(): void {
    const productoId = this.route.snapshot.paramMap.get("idProducto");
    const cantidad = this.route.snapshot.paramMap.get("cantidad");
    this.obtenerImagen(productoId);
    this.obtenerPrecio(productoId, cantidad);
  }

  private obtenerImagen(productoId: any) {
    this.obtenerImageService.obtenerImagenPorId(productoId)
    .subscribe((base64Image: string) => {
        this.image = "data:image/jpeg;base64," + base64Image;
      });
  }

  private obtenerPrecio(productoId: string, cantidad: string) {
    this.compraProductoService.calcularPrecio(productoId, cantidad)
      .subscribe((response) => {
        this.producto = response;
        console.log(this.producto);
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

  toggleHiddenText(event: Event): void {
    event.preventDefault();
    this.hiddenTextVisible = !this.hiddenTextVisible;
  }
}
