import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearMascotaComponent } from './components/crear-mascota/crear-mascota.component';
import { MascotaComponent } from './components/mascota/mascota.component';

const routes: Routes = [
  {
    path: '',
    component: MascotaComponent,
    children: [
      {
        path: 'crear',
        component: CrearMascotaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MascotaRoutingModule { }
