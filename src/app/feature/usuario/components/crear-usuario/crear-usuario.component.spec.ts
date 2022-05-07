import { of } from 'rxjs';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { MaterialModule } from '@shared/material/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { UsuarioService } from '@usuario/shared/service/usuario.service';
import { CrearUsuarioComponent } from './crear-usuario.component';
import { Usuario } from '@usuario/shared/model/usuario';

describe('CrearUsuarioComponent', () => {
  let component: CrearUsuarioComponent;
  let fixture: ComponentFixture<CrearUsuarioComponent>;
  let usuarioService: UsuarioService;

 /*  let spyUsuariosServiceConsultar: jasmine.Spy; */
  let usuario = new Usuario('Julio' , 'Osorio', '103694987', '34725812');

  /* let usuarios: Usuario[] = [
    {
    id: 1,
    nombre: 'Julio' , 
    apellido: 'Osorio', 
    identificacion: '103694987', 
    numeroCelular: '34725812'
    }
  ]; */

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearUsuarioComponent ],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        {
          provide: MatDialogRef,
          useValue: {}
        },
        UsuarioService,
        HttpService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearUsuarioComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService);
    spyOn(usuarioService, 'consultarPorId').and.returnValue(of(usuario))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia cargar titulo Registrar Usuario', () => {
    component.id = 'crear';
    component['cargarUsuario']();
    expect('Registrar Usuario').toEqual(component.titulo);
  });
  

  it('deberia fabricar usuario', () => {
  
    component.usuarioForm.controls.nombre.setValue('Julio');
    component.usuarioForm.controls.apellido.setValue('Osorio');
    component.usuarioForm.controls.identificacion.setValue('103694987');
    component.usuarioForm.controls.numeroCelular.setValue('34725812');
    component['fabricarUsuario']();

  })

});
