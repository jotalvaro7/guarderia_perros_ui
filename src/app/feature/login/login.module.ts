import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login.component';
import { SharedModule } from '@shared/shared.module';
import { LoginService } from './shared/service/login.service';
import { LoginRoutingModule } from './login-routing.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    LoginRoutingModule,
    SharedModule

  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
