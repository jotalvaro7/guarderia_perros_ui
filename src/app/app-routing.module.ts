import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login', loadChildren: () => import('@login/login.module')
      .then(mod => mod.LoginModule)
  },
  {
    path: 'producto', loadChildren: () => import('@producto/producto.module')
      .then(mod => mod.ProductoModule), canActivate: [SecurityGuard]
  },
  {
    path: 'producto/comprar/:idProducto/cantidad/:cantidad', loadChildren: () =>
      import('@compra-producto/compra-producto.module').then(mod => mod.CompraProductoModule), canActivate: [SecurityGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
