import { NgModule } from '@angular/core';

import { FacturaComponent } from '../shared/factura/components/factura/factura.component';
import { FacturaService } from './factura/shared/service/factura.service';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    FacturaComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [FacturaComponent, SharedModule],
  providers: [FacturaService]
})
export class FacturaModule { }
