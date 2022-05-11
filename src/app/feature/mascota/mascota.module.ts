import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { MascotaRoutingModule } from './mascota-routing.module';
import { CrudMascotaComponent } from './components/crud-mascota/crud-mascota.component';
import { MascotaComponent } from './components/mascota/mascota.component';
import { MascotaService } from './shared/service/mascota/mascota.service';
import { RegistroIngresoService } from './shared/service/registro-ingreso/registro-ingreso.service';


@NgModule({
  declarations: [
    CrudMascotaComponent,
    MascotaComponent,
  ],
  imports: [
    MascotaRoutingModule,
    SharedModule
  ],
  providers: [
    MascotaService,
    RegistroIngresoService
  ]
})
export class MascotaModule { }
