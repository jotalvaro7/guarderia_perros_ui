import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { MensajeErrorCamposDirective } from "./directivas/error-campos/directiva/mensaje-error-campos.directive";
import { MensajeErrorCamposSubmitDirective } from "./directivas/error-campos/directiva/mensaje-error-campos-submit.directive";
import { MensajeErrorCamposContenedorDirective } from "./directivas/error-campos/directiva/mensaje-error-campos-contenedor.directive";
import { ErrorCamposPlantillaComponent } from "./directivas/error-campos/componente/error-campos-plantilla.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TrackByPipe } from "./pipe/track-by.pipe";
import { MaterialModule } from "./material/material-module";
import { FacturaComponent } from "./factura/components/factura/factura.component";
import { FacturaService } from "./factura/shared/service/factura.service";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { MainLayoutComponent } from "./components/main-layout/main-layout.component";
import { RouterModule } from "@angular/router";
import { ObtenerImagenService } from "./services/obtener-imagen/obtener-imagen.service";
@NgModule({
  declarations: [
    ErrorCamposPlantillaComponent,
    MensajeErrorCamposDirective,
    MensajeErrorCamposContenedorDirective,
    MensajeErrorCamposSubmitDirective,
    TrackByPipe,
    FacturaComponent,
    NavbarComponent,
    ToolbarComponent,
    MainLayoutComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CommonModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    MensajeErrorCamposDirective,
    MensajeErrorCamposContenedorDirective,
    MensajeErrorCamposSubmitDirective,
    ReactiveFormsModule,
    FormsModule,
    TrackByPipe,
    MaterialModule,
    FacturaComponent,
    NavbarComponent,
    ToolbarComponent,
    MainLayoutComponent,
  ],
  providers: [FacturaService, ObtenerImagenService],
})
export class SharedModule {}
