import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { FacturaRoutingModule } from './factura-routing.module';
import { FacturaComponent } from './components/factura/factura.component';
import { FacturaService } from './shared/service/factura.service';


@NgModule({
  declarations: [
    FacturaComponent
  ],
  imports: [
    SharedModule,
    FacturaRoutingModule
  ],
  providers: [
    FacturaService
  ]
})
export class FacturaModule { }
