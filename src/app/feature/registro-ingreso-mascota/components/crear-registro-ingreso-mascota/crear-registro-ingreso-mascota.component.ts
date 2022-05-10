import { Component, OnInit } from '@angular/core';

import { NotificarRegistroMascotaEmitterService } from '@shared/emitters/notificar-registro-mascota-emitter.service';
import { IdMascota } from '../../shared/model/idMascota';
import { RegistroIngresoService } from '@registro-ingreso-mascota/shared/service/registro-ingreso.service'

@Component({
  selector: 'app-crear-registro-ingreso-mascota',
  templateUrl: './crear-registro-ingreso-mascota.component.html',
  styleUrls: ['./crear-registro-ingreso-mascota.component.scss']
})
export class CrearRegistroIngresoMascotaComponent implements OnInit {

  constructor(
    private notificarRegistroMascotaEmitterService: NotificarRegistroMascotaEmitterService,
    private registroIngresoService: RegistroIngresoService,
  ) { }

  ngOnInit(): void {
    this.notificarRegistroMascotaEmitterService.notificar.subscribe(
      (idMascota) => {
      this.crearRegistroIngreoMascota(idMascota);
    });
  }

  crearRegistroIngreoMascota(idMascota: IdMascota) {
    this.registroIngresoService.guardar(idMascota).subscribe();
  }

}
