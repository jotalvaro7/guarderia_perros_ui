import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { MascotaRoutingModule } from './mascota-routing.module';
import { CrearMascotaComponent } from './components/crear-mascota/crear-mascota.component';
import { MascotaComponent } from './components/mascota/mascota.component';
import { MascotaService } from './shared/service/mascota/mascota.service';


@NgModule({
  declarations: [
    CrearMascotaComponent,
    MascotaComponent,
  ],
  imports: [
    MascotaRoutingModule,
    SharedModule
  ],
  providers:[
    MascotaService
  ]
})
export class MascotaModule { }
