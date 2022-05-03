import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaRoutingModule } from './factura-routing.module';
import { FacturaComponent } from './components/factura/factura.component';


@NgModule({
  declarations: [
    FacturaComponent
  ],
  imports: [
    CommonModule,
    FacturaRoutingModule
  ]
})
export class FacturaModule { }
