import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificarCobroEmitterService } from '@shared/emitters/notificar-cobro-emitter.service';
import { SwalAlertTriggerService } from '@core/services/swal-alert-trigger.service';
import { FacturaService } from '../../shared/service/factura.service';
import { Factura } from '../../shared/model/factura';

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
    private notificarCobroServiceEmitter: NotificarCobroEmitterService,
    private swalAlertTriggerService: SwalAlertTriggerService,
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
    this.swalAlertTriggerService.ejecutarSwalAlert('success', 'Cobro Realizado', '');
    this.notificarCobroServiceEmitter.notificar.emit(this.idMascota);
  }


  cancelar() {
    this.dialogRef.close();
  }
}
