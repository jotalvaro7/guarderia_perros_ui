import { NgModule } from '@angular/core';

import { RegistroIngresoMascotaRoutingModule } from './registro-ingreso-mascota-routing.module';
import { EliminarRegistroIngresoMascotaComponent } from './components/eliminar-registro-ingreso-mascota/eliminar-registro-ingreso-mascota.component';
import { CrearRegistroIngresoMascotaComponent } from './components/crear-registro-ingreso-mascota/crear-registro-ingreso-mascota.component';
import { SharedModule } from '@shared/shared.module';
import { RegistroIngresoService } from './shared/service/registro-ingreso.service';


@NgModule({
  declarations: [
    EliminarRegistroIngresoMascotaComponent,
    CrearRegistroIngresoMascotaComponent
  ],
  imports: [
    SharedModule,
    RegistroIngresoMascotaRoutingModule
  ],
  providers: [
    RegistroIngresoService
  ]
})
export class RegistroIngresoMascotaModule { }
