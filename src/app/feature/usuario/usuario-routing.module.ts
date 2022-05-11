import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudUsuarioComponent } from './components/crud-usuario/crud-usuario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    children: [
      {
        path: 'crear',
        component: CrudUsuarioComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
