import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginComponent } from './login.component';
import { LoginService } from '@login/shared/service/login.service';
import { CredencialesDeUsuario } from '@login/shared/model/credencialesDeUsuario';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;

  beforeEach(() => {
    const loginServiceMock = jasmine.createSpyObj('LoginService', ['obtenerToken']);

    loginServiceMock.obtenerToken.and.returnValue(of({ token: 'dummy_token' }));

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule, // Mock del HttpClient
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize login form', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('username')).toBeDefined();
    expect(component.loginForm.get('password')).toBeDefined();
  });

  it('should call login service when form is submitted', () => {
    const spyNavigate = spyOn((<any>component).route, 'navigate');

    component.loginForm.get('username').setValue('test_username');
    component.loginForm.get('password').setValue('test_password');

    component.onSubmit();

    expect(loginService.obtenerToken).toHaveBeenCalledWith(new CredencialesDeUsuario('test_username', 'test_password'));
    expect(spyNavigate).toHaveBeenCalledWith(['/producto']);
  });
});





