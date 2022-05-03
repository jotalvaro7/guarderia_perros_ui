import { Component, Inject, OnInit, Optional} from '@angular/core';
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

  private factura: Factura;
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
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });
  
      swalWithBootstrapButtons.fire({
        /* background: "#444",
        color: "#fff", */
        title: `${this.factura.nombreMascota}  
                Ingreso: ${this.factura.fechaIngreso} 
                Salida: ${this.factura.fechaSalida}`,
        text: `${this.factura.totalTiempoEnGuarderia}
               $`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Cobrar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          /* this.mascotaService.eliminar(mascota.id).subscribe(
            response => {
              if (!response) {
                this.mascotas = this.mascotas.filter(cli => cli !== mascota);
                swalWithBootstrapButtons.fire({
                  background: "#444",
                  color: "#fff",
                  icon: 'success',
                  title: 'Mascota Eliminada!',
                  text: `La mascota se ha eliminado con éxito de la base de datos`,
                });
              }
            },
            err => {
              Swal.fire({
                background: "#444444",
                  color: "#fff",
                  icon: "error",
                  title: err.error.mensaje,
                  text:  'Nombre de la excepcion: ' + err.error.nombreExcepcion
              })
            }); */
        }
      });
    })
  }

}
