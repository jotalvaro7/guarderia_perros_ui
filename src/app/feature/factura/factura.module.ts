import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { FacturaRoutingModule } from './factura-routing.module';
import { FacturaComponent } from './components/factura/factura.component';


@NgModule({
  declarations: [
    FacturaComponent
  ],
  imports: [
    SharedModule,
    FacturaRoutingModule
  ]
})
export class FacturaModule { }
