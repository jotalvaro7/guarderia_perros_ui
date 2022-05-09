import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from './home.component';
import { TrmService } from './shared/service/trm.service';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    TrmService
  ]
})
export class HomeModule { }
