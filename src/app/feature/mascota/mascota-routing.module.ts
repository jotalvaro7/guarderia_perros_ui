import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudMascotaComponent } from './components/crud-mascota/crud-mascota.component';
import { MascotaComponent } from './components/mascota/mascota.component';

const routes: Routes = [
  {
    path: '',
    component: MascotaComponent,
    children: [
      {
        path: 'crear',
        component: CrudMascotaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MascotaRoutingModule { }
