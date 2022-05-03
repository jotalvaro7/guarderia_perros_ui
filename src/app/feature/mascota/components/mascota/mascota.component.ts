import { Component, OnInit } from '@angular/core';
import { Mascota } from '@mascota/shared/model/mascota/mascota';
import { ActivatedRoute } from '@angular/router';
import { MascotaService } from '@mascota/shared/service/mascota/mascota.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearMascotaComponent } from '../crear-mascota/crear-mascota.component';
import { idMascotaResponse } from '@mascota/shared/model/mascota/idMascotaResponse';
import { RegistroIngreso } from '@mascota/shared/model/registro-ingreso/registro-ingreso';
import { RegistroIngresoService } from '@mascota/shared/service/registro-ingreso/registro-ingreso.service';

import Swal from 'sweetalert2';
import { FacturaComponent } from '@factura/components/factura/factura.component';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.scss']
})
export class MascotaComponent implements OnInit {

  columnas: string[] = ['Id', 'Nombre', 'Raza', 'Peso', 'Editar', 'Factura'];

  public mascotas: Mascota[];

  public idUsuario: number;
  public nombreUsuario: string;
  public apellidoUsuario: string;

  constructor(
    private mascotaService: MascotaService,
    private registroIngresoService: RegistroIngresoService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.obtenerMascotasUsuario();
    this.mascotaService.notificar.subscribe(
      (response:idMascotaResponse) => {
        this.obtenerMascotasUsuario();
        this.registrarIngresoMascota(response);
      })
  }


  obtenerMascotasUsuario():void{
    this.activatedRoute.paramMap.subscribe((params) =>{
      this.nombreUsuario = params.get("nombreUsuario");
      this.apellidoUsuario = params.get("apellidoUsuario")
      this.idUsuario = +params.get("idUsuario");
      this.mascotaService.consultarMascotasPorIdUsuario(this.idUsuario).subscribe(
        mascotas => this.mascotas = mascotas
      )
    })
    
  }

  public crear(action:string){
    this.dialog.open(CrearMascotaComponent, {
      width: "20%",
      autoFocus: true,
      data:{id:action, idUsuario:this.idUsuario}
    })
  }

  public editar(id:Number){
    this.dialog.open(CrearMascotaComponent,{
      width: "20%",
      autoFocus: true,
      data:{id:id, idUsuario:this.idUsuario}
    })
  }

  public delete(mascota: Mascota): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      background: "#444",
      color: "#fff",
      title: 'Cuidado!',
      text: `Está seguro de eliminar la mascota ${mascota.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.mascotaService.eliminar(mascota.id).subscribe(
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
          });
      }
    });
  }

  factura(idMascota:Number){
    this.dialog.open(FacturaComponent,{
      width: "20%",
      autoFocus: true,
      data:{idMascota:idMascota}
    })
  }

  registrarIngresoMascota(idResponse: idMascotaResponse){
    let registroIngreso = new RegistroIngreso();
    registroIngreso.idMascota =  idResponse.valor
    this.registroIngresoService.guardar(registroIngreso).subscribe();
  }

}
