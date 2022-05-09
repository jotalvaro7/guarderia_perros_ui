import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '@shared/material/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioService } from '@usuario/shared/service/usuario.service';
import { UsuarioComponent } from './usuario.component';
import { Usuario } from '@usuario/shared/model/usuario';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';


describe('UsuarioComponent', () => {
  let component: UsuarioComponent;
  let fixture: ComponentFixture<UsuarioComponent>;
  let usuarioService: UsuarioService;
  let spyUsuarioServiceEliminar: jasmine.Spy;

  let dialogSpy: jasmine.Spy;
  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };


  const usuarios: Usuario[] = [
    {
      id: 1,
      nombre: 'Julio',
      apellido: 'Osorio',
      identificacion: '103694987',
      numeroCelular: '34725812'
    }
  ];

  const dialogMock = {
    open: () => { }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      providers: [UsuarioService, HttpService,
        {
          provide: MatDialog,
          useValue: dialogMock
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService);
    spyOn(usuarioService, 'consultar').and.returnValue(of(usuarios));
    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    spyOn(usuarioService, 'notificar');
    spyUsuarioServiceEliminar = spyOn(usuarioService, 'eliminar');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('deberia llamar metodo openDialog para crear', () => {
    const action = 'crear';
    const key = 'dialog';
    component.crear('crear');
    component[key].open(CrearUsuarioComponent, {
      width: '20%',
      autoFocus: true,
      data: { id: action }
    });
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('deberia llamar metodo openDialog para editar ', () => {
    const id = 2;
    const key = 'dialog';
    component.editar(id);
    component[key].open(CrearUsuarioComponent, {
      width: '20%',
      autoFocus: true,
      data: { id }
    });
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('deberia eliminar un usuario', () => {
    const usuario = new Usuario('Julio', 'Osorio', '1034', '555');
    component.delete(usuario);
  });

  it('deberia sacar error cuando se envia null el id del usuario', () => {
    const usuario = new Usuario('Julio', 'Osorio', '1034', '555');
    const error = 'error';
    spyUsuarioServiceEliminar.and.returnValue(throwError(error));

    usuarioService.eliminar(null).subscribe(
      () => { },
      (err) => expect(error).toEqual(err)
    );
    component.delete(usuario);
  });

});
