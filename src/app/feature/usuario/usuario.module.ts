import { NgModule } from '@angular/core';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { SharedModule } from '@shared/shared.module';
import { UsuarioService } from './shared/service/usuario.service';


@NgModule({
  declarations: [
    UsuarioComponent,
  ],
  imports: [
    UsuarioRoutingModule,
    SharedModule
  ],
  providers:[
    UsuarioService
  ]
})
export class UsuarioModule { }
