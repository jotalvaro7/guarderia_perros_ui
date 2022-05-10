import { Component, OnInit } from '@angular/core';
import { NotificarRegistroMascotaEmitterService } from '@shared/emitters/notificar-registro-mascota-emitter.service';
import { RegistroIngresoService } from '@registro-ingreso-mascota/shared/service/registro-ingreso.service';

@Component({
  selector: 'app-eliminar-registro-ingreso-mascota',
  templateUrl: './eliminar-registro-ingreso-mascota.component.html',
  styleUrls: ['./eliminar-registro-ingreso-mascota.component.scss']
})
export class EliminarRegistroIngresoMascotaComponent implements OnInit {

  constructor(
    private registroIngresoService: RegistroIngresoService,
    private notificarRegistroMascotaEmitterService: NotificarRegistroMascotaEmitterService,
  ) { }

  ngOnInit(): void {
    this.notificarRegistroMascotaEmitterService.notificarEliminar.subscribe(idMascota => {
      this.registroIngresoService.eliminar(idMascota).subscribe();
    });
  }

}
