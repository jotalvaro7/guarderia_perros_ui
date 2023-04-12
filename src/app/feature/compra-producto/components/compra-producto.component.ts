import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-compra-producto',
  templateUrl: './compra-producto.component.html',
  styleUrls: ['./compra-producto.component.scss']
})
export class CompraProductoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const productoId = this.route.snapshot.paramMap.get('idProducto');
    const cantidad = this.route.snapshot.paramMap.get('cantidad');
    console.log(productoId, cantidad);
  }

}
