import { NgModule } from '@angular/core';
import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoComponent } from './components/producto/producto.component';
import { SharedModule } from '@shared/shared.module';
import { ProductoService } from './shared/service/producto.service';


@NgModule({
  declarations: [
    ProductoComponent
  ],
  imports: [
    ProductoRoutingModule,
    SharedModule
  ],
  providers: [
    ProductoService
  ]
})
export class ProductoModule { }
