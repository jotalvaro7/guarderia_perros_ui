import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { MaterialModule } from '@shared/material/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MascotaService } from '@mascota/shared/service/mascota/mascota.service';
/* import { IdMascotaResponse } from 'src/app/feature/registro-ingreso-mascota/shared/model/idMascota'; */
/* import { RegistroIngresoService } from '@mascota/shared/service/registro-ingreso/registro-ingreso.service'; */
import { CrearMascotaComponent } from './crear-mascota.component';
import { of, throwError } from 'rxjs';

import { Mascota } from '@mascota/shared/model/mascota/mascota';

describe('CrearMascotaComponent', () => {
  let component: CrearMascotaComponent;
  let fixture: ComponentFixture<CrearMascotaComponent>;
  let mascotaService: MascotaService;
 /*  let registroIngresoService: RegistroIngresoService;
  const idMascotaResponse = new IdMascotaResponse(); */
  let spyMascotaServiceActualizar: jasmine.Spy;
  let spyMascotaServiceGuardar: jasmine.Spy;

  const mascota = new Mascota();
  mascota.id = 1;
  mascota.nombre = 'Zeus';
  mascota.raza = 'Doberman';
  mascota.peso = '8Kg';
  mascota.idUsuario = 1;

  const mascotaConsulta = new Mascota();
  mascota.nombre = 'Zeus';
  mascota.raza = 'Doberman';
  mascota.peso = '8Kg';
  mascota.idUsuario = 1;


  const mascotaGuardar = new Mascota();
  mascota.nombre = 'Zeus';
  mascota.raza = 'Doberman';
  mascota.peso = '8Kg';
  mascota.idUsuario = 1;

  const dialogMock = {
    close: jasmine.createSpy('close')
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CrearMascotaComponent],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,

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
        MascotaService,
        /* RegistroIngresoService, */
        HttpService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearMascotaComponent);
    component = fixture.componentInstance;
    mascotaService = TestBed.inject(MascotaService);
    /* registroIngresoService = TestBed.inject(RegistroIngresoService); */
    spyMascotaServiceActualizar = spyOn(mascotaService, 'actualizar').and.returnValue(of(mascota));
    spyMascotaServiceGuardar = spyOn(mascotaService, 'guardar').and.returnValue(of(mascotaGuardar));
    spyOn(mascotaService, 'consultarMascotaPorId').and.returnValue(of(mascotaConsulta));
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia cargar el titulo Registrar Mascota', () => {
    component.id = 'crear';
    const key = 'cargarMascota';
    component[key]();
    expect('Registrar Mascota').toEqual(component.titulo);
  });

  it('deberia fabricar mascota', () => {
    const key = 'fabricarMascota';
    component.mascotaForm.controls.nombre.setValue('Max');
    component.mascotaForm.controls.raza.setValue('Golden');
    component.mascotaForm.controls.peso.setValue('10Kg');
    component[key]();
    expect(component.mascotaForm.valid).toBeTruthy();

  });

  it('deberia guardar mascota', async () => {
    component.crear();
    expect(spyMascotaServiceGuardar).toHaveBeenCalled();
  });

  it('deberia actualizar mascota', async () => {
    component.actualizar();
    expect(spyMascotaServiceActualizar).toHaveBeenCalled();
  });

  it('deberia tomar decision de crear mascota', () => {
    const key = 'crearClicked';
    const spy = spyOn(component, 'crear').and.callThrough();
    component[key] = true;
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

  it('deberia tomar decision de actualizar mascota', () => {
    const key = 'crearClicked';
    const spy = spyOn(component, 'actualizar').and.callThrough();
    component[key] = false;
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });


  it('deberia limpiar el formulario', () => {
    const spy = spyOn(component.mascotaForm, 'reset');
    component.limpiarForm();
    expect(spy).toHaveBeenCalled();
  });

  it('deberia setear variable crearClicked en true', () => {
    const key = 'crearClicked';
    component.onCrearClick();
    expect(true).toEqual(component[key]);
  });

  it('deberia setear variable crearClicked en false', () => {
    const key = 'crearClicked';
    component.onEditarClick();
    expect(false).toEqual(component[key]);
  });

  it('deberia sacar error cuando se envia null en el actualizar mascota', () => {
    const error = 'error';
    spyMascotaServiceActualizar.and.returnValue(throwError(error));

    mascotaService.actualizar(null).subscribe(
      () => { },
      (err) => expect(error).toEqual(err)
    );
    component.actualizar();
  });

  it('deberia sacar error cuando se envia null en el guardar mascota', () => {
    const error = 'error';
    spyMascotaServiceGuardar.and.returnValue(throwError(error));

    mascotaService.guardar(null).subscribe(
      () => { },
      (err) => expect(error).toEqual(err)
    );
    component.crear();
  });



});
