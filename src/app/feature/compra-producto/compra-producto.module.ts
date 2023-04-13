import { NgModule } from "@angular/core";

import { CompraProductoRoutingModule } from "./compra-producto-routing.module";
import { CompraProductoComponent } from "./components/compra-producto.component";
import { SharedModule } from "@shared/shared.module";
import { CompraProductoService } from "./shared/service/compra-producto.service";

@NgModule({
  declarations: [CompraProductoComponent],
  imports: [SharedModule, CompraProductoRoutingModule],
  providers: [CompraProductoService],
})
export class CompraProductoModule {}
