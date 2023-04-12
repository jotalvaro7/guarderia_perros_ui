import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompraProductoComponent } from "./components/compra-producto.component";

const routes: Routes = [
  {
    path: "",
    component: CompraProductoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompraProductoRoutingModule {}
