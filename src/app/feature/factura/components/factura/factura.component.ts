import { Component, Inject, OnInit, Optional} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Factura } from '@factura/shared/model/factura';
import { FacturaService } from '@factura/shared/service/factura.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit {

  public factura: Factura;
  private idMascota: Number;

  constructor(
    private facturaService: FacturaService,
    public dialogRef: MatDialogRef<FacturaComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.idMascota = data.idMascota;
   }

  ngOnInit(): void {
    this.facturaService.consultar(this.idMascota).subscribe(factura => {
      this.factura = factura
      console.log(this.factura)
    })
  }

  cobrar(){
    console.log("cobrando")
  }

  cancelar(){
    this.dialogRef.close();
  }
}
