import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Factura } from '@factura/shared/model/factura';
import { FacturaService } from '@factura/shared/service/factura.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit {

  public factura: Factura;
  private idMascota: number;

  constructor(
    private facturaService: FacturaService,
    public dialogRef: MatDialogRef<FacturaComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.idMascota = data.idMascota;
  }

  ngOnInit(): void {
    this.facturaService.consultar(this.idMascota).subscribe(
      factura => this.factura = factura
    );
  }

  cobrar() {
    this.dialogRef.close();
    Swal.fire({
      icon: 'success',
      title: 'Cobro Realizado',
    });
    this.facturaService.notificar.emit(this.idMascota);
  }



  cancelar() {
    this.dialogRef.close();
  }
}
