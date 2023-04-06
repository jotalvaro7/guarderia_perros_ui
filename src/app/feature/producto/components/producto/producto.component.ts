import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from '@producto/shared/model/producto/producto';
import { ProductoService } from '@producto/shared/service/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  columnas: string[] = ['#', 'Titulo', 'Autor', 'Calificación', 'Cantidad', 'Precio', 'Comprar', 'Puerto BookDto', 'Puerto RatingDto'];
  numbers: number[] = [1, 2, 3, 4, 5];
  selectedNumber: number;

  public productos: Producto[];
  public dataSource: any;

  constructor(
    private productoService: ProductoService,
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.obtenerProductos().subscribe(response => {
      this.productos = response;
      this.dataSource = new MatTableDataSource(this.productos);
      this.dataSource.paginator = this.paginator;
    })
  }

}
