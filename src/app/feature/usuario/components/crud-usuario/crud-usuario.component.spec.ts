import { of } from 'rxjs';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { MaterialModule } from '@shared/material/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '@usuario/shared/service/usuario.service';
import { CrudUsuarioComponent } from './crud-usuario.component';
import { Usuario } from '@usuario/shared/model/usuario';
import { IdUsuarioResponse } from '@usuario/shared/model/idResponseUsuario';


describe('CrudUsuarioComponent', () => {
  let component: CrudUsuarioComponent;
  let fixture: ComponentFixture<CrudUsuarioComponent>;
  let usuarioService: UsuarioService;
  let spyUsuariosServiceGuardar: jasmine.Spy;
  let spyUsuariosServiceEditar: jasmine.Spy;

  const usuario = new Usuario('Julio', 'Osorio', '103694987', '34725812');
  const idUsuario = new IdUsuarioResponse();
  idUsuario.valor = 1;

  const dialogMock = {
    close: () => { }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CrudUsuarioComponent],
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
          useValue: dialogMock
        },
        UsuarioService,
        HttpService
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudUsuarioComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService);
    spyOn(usuarioService, 'consultarPorId').and.returnValue(of(usuario));
    spyUsuariosServiceGuardar = spyOn(usuarioService, 'guardar').and.returnValue(of(idUsuario));
    spyUsuariosServiceEditar = spyOn(usuarioService, 'editar').and.returnValue(of(idUsuario));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia cargar titulo Registrar Usuario', () => {
    component.id = 'crear';
    const key = 'cargarUsuario';
    component[key]();
    expect('Registrar Usuario').toEqual(component.titulo);
  });


  it('deberia fabricar usuario', () => {
    const key = 'fabricarUsuario';
    component.usuarioForm.controls.nombre.setValue('Julio');
    component.usuarioForm.controls.apellido.setValue('Osorio');
    component.usuarioForm.controls.identificacion.setValue('103694987');
    component.usuarioForm.controls.numeroCelular.setValue('34725812');
    component[key]();

    expect(component.usuarioForm.valid).toBeTruthy();

  });

  it('deberia guardar usuario', async () => {
    component.crear();
    expect(spyUsuariosServiceGuardar).toHaveBeenCalled();
  });

  it('deberia actualizar usuario', async () => {
    component.actualizar();
    expect(spyUsuariosServiceEditar).toHaveBeenCalled();
  });

  it('deberia tomar decision de crear usuario', () => {
    const spy = spyOn(component, 'crear').and.callThrough();
    component.crearClicked = true;
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

  it('deberia tomar decision de actualizar usuario', () => {
    const spy = spyOn(component, 'actualizar').and.callThrough();
    component.crearClicked = false;
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

  it('deberia limpiar formulario', () => {
    const spy = spyOn(component.usuarioForm, 'reset');
    component.limpiarForm();
    expect(spy).toHaveBeenCalled();
  });

  it('deberia setear variable true en el boton crear', () => {
    component.onCrearClick();
    expect(true).toBe(component.crearClicked);
  });

  it('deberia setear variable false en el boton editar', () => {
    component.onEditarClick();
    expect(false).toBe(component.crearClicked);
  });
});


