import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegistroIngresoService } from '@mascota/shared/service/registro-ingreso/registro-ingreso.service';
import { Mascota } from '@mascota/shared/model/mascota/mascota';
import { MascotaService } from '@mascota/shared/service/mascota/mascota.service';
import { SwalAlertTriggerService } from '@core/services/swal-alert-trigger.service';
import { IdMascota } from '@mascota/shared/model/mascota/idMascota';
import { RegistroIngresoMascota } from '@mascota/shared/model/mascota/registroIngresoMascota';


@Component({
  selector: 'app-crear-mascota',
  templateUrl: './crud-mascota.component.html',
  styleUrls: ['./crud-mascota.component.scss']
})
export class CrudMascotaComponent implements OnInit {

  public mascotaForm: FormGroup;
  public mascota: Mascota;
  public titulo: string;
  public id: any;
  public idUsuario: any;
  private crearClicked: boolean;

  constructor(
    public dialogRef: MatDialogRef<CrudMascotaComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private mascotaService: MascotaService,
    private registroIngresoService: RegistroIngresoService,
    private swalAlertTriggerService: SwalAlertTriggerService,
  ) {
    this.id = data.id;
    this.idUsuario = data.idUsuario;
    this.crearClicked = false;
  }

  ngOnInit(): void {
    this.mascota = new Mascota();
    this.construirFormularioMascota();
    this.cargarMascota();
  }

  private construirFormularioMascota() {
    this.mascotaForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      raza: new FormControl('', [Validators.required]),
      peso: new FormControl('', [Validators.required]),
    });
  }

  private cargarMascota(): void {
    if (this.id === 'crear') {
      this.titulo = 'Registrar Mascota';
    } else {
      this.titulo = 'Actualizar Mascota';
      this.mascotaService.consultarMascotaPorId(this.id).subscribe(mascota => {
        this.mascota = mascota;
        this.setValue();
      });
    }
  }

  private setValue(): void {
    this.mascotaForm.setValue({
      nombre: this.mascota.nombre,
      raza: this.mascota.raza,
      peso: this.mascota.peso,
      idUsuario: this.mascota.idUsuario
    });
  }

  onSubmit() {
    if (this.crearClicked) {
      this.crear();
    } else {
      this.actualizar();
    }
  }

  public crear(): void {
    this.fabricarMascota();
    this.mascotaService.guardar(this.mascota).subscribe(
      (response: IdMascota) => {
        this.dialogRef.close();
        this.mascotaService.notificar.emit(response);
        this.crearRegistroIngresoMascota(response);
        this.swalAlertTriggerService.ejecutarSwalAlert('success',
          'Nueva Mascota',
          `Mascota ${this.mascota.nombre} registrada con Exito!`);
      },
    );
  }

  public actualizar(): void {
    this.fabricarMascota();
    this.mascotaService.actualizar(this.mascota).subscribe(
      response => {
        this.dialogRef.close();
        this.mascotaService.notificar.emit(response);
        this.swalAlertTriggerService.ejecutarSwalAlert('success',
          'Se ha actualizado la Mascota',
          `Mascota ${this.mascota.nombre} actualizada con Exito!`);
      },
    );
  }

  private fabricarMascota(): void {
    this.mascota.nombre = this.mascotaForm.get('nombre').value;
    this.mascota.raza = this.mascotaForm.get('raza').value;
    this.mascota.peso = this.mascotaForm.get('peso').value;
    this.mascota.idUsuario = this.idUsuario;
  }

  crearRegistroIngresoMascota(idMascota: IdMascota) {
    const registroIngresoMascota = new RegistroIngresoMascota();
    registroIngresoMascota.idMascota = idMascota.valor;
    this.registroIngresoService.guardar(registroIngresoMascota).subscribe();
  }

  limpiarForm() {
    this.mascotaForm.reset();
  }

  onCrearClick() {
    this.crearClicked = true;
  }

  onEditarClick() {
    this.crearClicked = false;
  }

}
