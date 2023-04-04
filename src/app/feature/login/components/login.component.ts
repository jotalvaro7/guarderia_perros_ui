import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CredencialesDeUsuario } from "@login/shared/model/credencialesDeUsuario";
import { Token } from "@login/shared/model/token";
import { LoginService } from "@login/shared/service/login.service";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup
  public credencialesDeUsuario: CredencialesDeUsuario;

  constructor(
    private route: Router,
    private loginService: LoginService
  ) {

  }

  ngOnInit(): void {
    this.construirFormularioAutenticacion();

  }

  private construirFormularioAutenticacion() {
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  onSubmit(): void {
    this.fabricarCredencialesDeUsuario();
    console.log("Credenciales de usuario: ", this.credencialesDeUsuario);
    this.loginService.obtenerToken(this.credencialesDeUsuario).subscribe(
      (response: Token) => {
        console.log("Token: ", response)
        sessionStorage.setItem('access_token', response.token);
        this.route.navigate(['/home']);
      }
    )

  }

  private fabricarCredencialesDeUsuario(): void {
    this.credencialesDeUsuario = new CredencialesDeUsuario("", "");
    this.credencialesDeUsuario.username = this.loginForm.get("username").value;
    this.credencialesDeUsuario.password = this.loginForm.get("password").value;
  }
}


