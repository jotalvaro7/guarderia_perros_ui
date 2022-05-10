import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Mascota } from '@mascota/shared/model/mascota/mascota';
import { MascotaService } from '@mascota/shared/service/mascota/mascota.service';
import { CrearMascotaComponent } from '../crear-mascota/crear-mascota.component';
import { FacturaComponent } from '../../../factura/components/factura/factura.component';
import { NotificarCobroEmitterService } from '@shared/emitters/notificar-cobro-emitter.service';
import { NotificarRegistroMascotaEmitterService } from '@shared/emitters/notificar-registro-mascota-emitter.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.scss']
})
export class MascotaComponent implements OnInit {

  columnas: string[] = ['#', 'Nombre', 'Raza', 'Peso', 'Editar', 'Factura'];

  public mascotas: Mascota[];
  public mascota: Mascota;

  public idUsuario: number;
  public nombreUsuario: string;
  public apellidoUsuario: string;

  public dataSource: any;

  constructor(
    private mascotaService: MascotaService,
    private notificarCobroEmitterService: NotificarCobroEmitterService,
    private notificarRegistroMascotaEmitterService: NotificarRegistroMascotaEmitterService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.obtenerMascotasUsuario();
    this.subcripcionMascotaServiceEmitter();
    this.subcripcionFacturaServiceEmitter();
  }

  obtenerMascotasUsuario(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.nombreUsuario = params.get('nombreUsuario');
      this.apellidoUsuario = params.get('apellidoUsuario');
      this.idUsuario = +params.get('idUsuario');
      this.mascotaService.consultarMascotasPorIdUsuario(this.idUsuario).subscribe(
        mascotas => {
          this.mascotas = mascotas;
          this.dataSource = new MatTableDataSource(this.mascotas);
          this.dataSource.paginator = this.paginator;
        }
      );
    });
  }

  subcripcionMascotaServiceEmitter() {
    this.mascotaService.notificar.subscribe(
      (response) => {
        console.log(response);
        this.obtenerMascotasUsuario();
      });
  }

  subcripcionFacturaServiceEmitter() {
    this.notificarCobroEmitterService.notificar.subscribe(idMascota => {
      this.notificarRegistroMascotaEmitterService.notificarEliminar.emit(idMascota);
      this.obtenerMascotaDeUsuarioYEliminar(idMascota);
    });
  }

  public crear(action: string) {
    this.dialog.open(CrearMascotaComponent, {
      width: '20%',
      autoFocus: true,
      data: { id: action, idUsuario: this.idUsuario }
    });
  }

  public editar(id: number) {
    this.dialog.open(CrearMascotaComponent, {
      width: '20%',
      autoFocus: true,
      data: { id, idUsuario: this.idUsuario }
    });
  }

  obtenerMascotaDeUsuarioYEliminar(idMascota: number) {
    this.mascotaService.consultarMascotaPorId(idMascota).subscribe(mascota => {
      this.mascota = mascota;
      this.mascotaService.eliminar(this.mascota.id).subscribe(
        response => {
          if (!response) {
            this.mascotas = this.mascotas.filter(cli => cli !== this.mascota);
            this.mascotaService.notificar.emit();
          }
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: err.error.mensaje,
            text: 'Nombre de la excepcion: ' + err.error.nombreExcepcion
          });
        });
    });
  }

  factura(idMascota: number) {
    this.dialog.open(FacturaComponent, {
      autoFocus: true,
      data: { idMascota }
    });
  }

}
