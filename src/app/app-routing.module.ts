import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('@login/login.module').then(mod => mod.LoginModule)},
  { path: 'home', loadChildren: () => import('@home/home.module').then(mod => mod.HomeModule), canActivate:[SecurityGuard]},
  { path: 'usuario', loadChildren: () => import('@usuario/usuario.module').then(mod => mod.UsuarioModule) },
  {
    path: 'mascota/:nombreUsuario/:apellidoUsuario/:idUsuario', loadChildren: () => 
                                        import('@mascota/mascota.module').then(mod => mod.MascotaModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
