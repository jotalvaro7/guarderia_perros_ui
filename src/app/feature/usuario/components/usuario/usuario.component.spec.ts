import { of } from 'rxjs';
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


describe('UsuarioComponent', () => {
  let component: UsuarioComponent;
  let fixture: ComponentFixture<UsuarioComponent>;
  let usuarioService: UsuarioService;

  let usuarios: Usuario[] = [
    {
    id: 1,
    nombre: 'Julio' , 
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
        },]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService);
    spyOn(usuarioService, 'consultar').and.returnValue(of(usuarios));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('deberia llamar metodo openDialog para crear', () => {
    component.crear('crear');
  });

  it('deberia llamar metodo openDialog para editar ', () => {
    component.editar(2);
  });

  it('deberia obtener los usuarios', async() =>{
    component.obtenerUsuarios();
    expect(usuarioService.consultar).toHaveBeenCalled;
  });

});
