import { of } from 'rxjs';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '@shared/material/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MascotaService } from '@mascota/shared/service/mascota/mascota.service';
import { RegistroIngresoService } from '@mascota/shared/service/registro-ingreso/registro-ingreso.service';
import { NotificarCobroEmitterService } from '@shared/emitters/notificar-cobro-emitter.service';
import { MascotaComponent } from './mascota.component';
import { Mascota } from '@mascota/shared/model/mascota/mascota';
import { FacturaComponent } from '@factura/components/factura/factura.component';
import { CrearMascotaComponent } from '../crear-mascota/crear-mascota.component';



describe('MascotaComponent', () => {
  let component: MascotaComponent;
  let fixture: ComponentFixture<MascotaComponent>;
  let mascotaService: MascotaService;

  let dialogSpy: jasmine.Spy;
  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

  const mascota = new Mascota();
  let spyMascotaServiceConsultarMascotasPorId: jasmine.Spy;
  let spyMascotaServiceEliminarMascotaPorId: jasmine.Spy;

  const mascotas: Mascota[] = [
    {
      id: 1,
      nombre: 'Raz',
      raza: 'Pumeraña',
      peso: '5Kg',
      idUsuario: 1
    }
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MascotaComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      providers: [MascotaService, HttpService, RegistroIngresoService, NotificarCobroEmitterService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotaComponent);
    component = fixture.componentInstance;
    mascotaService = TestBed.inject(MascotaService);
    spyOn(mascotaService, 'consultarMascotasPorIdUsuario').and.returnValue(of(mascotas));
    spyMascotaServiceConsultarMascotasPorId = spyOn(mascotaService, 'consultarMascotaPorId').and.returnValue(of(mascota));
    spyMascotaServiceEliminarMascotaPorId = spyOn(mascotaService, 'eliminar');
    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('open dialog cuando se ejecuta el metodo crear', () => {
    const action = 'crear';
    const idUsuario = 1;
    const key = 'dialog';
    component.crear(action);
    component[key].open(CrearMascotaComponent, {
      width: '20%',
      autoFocus: true,
      data: { id: action, idUsuario }
    });
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogSpy).toHaveBeenCalledWith(CrearMascotaComponent, {
      width: '20%',
      autoFocus: true,
      data: { id: 'crear', idUsuario: 1 }
    });
  });

  it('open dialog cuando se ejecuta el metodo editar', () => {
    const id = 1;
    const idUsuario = 1;
    const key = 'dialog';
    component.editar(id);
    component[key].open(CrearMascotaComponent, {
      width: '20%',
      autoFocus: true,
      data: { id, idUsuario }
    });
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogSpy).toHaveBeenCalledWith(CrearMascotaComponent, {
      width: '20%',
      autoFocus: true,
      data: { id: 1, idUsuario: 1 }
    });
  });

  it('open dialog cuando se ejecuta el metodo factura', () => {
    const idMascota = 1;
    const key = 'dialog';
    component.factura(idMascota);
    component[key].open(FacturaComponent, {
      autoFocus: true,
      data: { idMascota }
    });
    expect(dialogSpy).toHaveBeenCalled();

  });

  it('deberia obtener mascota de usuario y eliminar', () => {
    const idMascota = 1;
    component.obtenerMascotaDeUsuarioYEliminar(idMascota);
    expect(spyMascotaServiceConsultarMascotasPorId).toHaveBeenCalled();
    expect(spyMascotaServiceEliminarMascotaPorId).toHaveBeenCalled();
  });



});
