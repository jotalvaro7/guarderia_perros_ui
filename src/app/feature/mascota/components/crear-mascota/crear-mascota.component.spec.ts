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
import { RegistroIngresoService } from '@mascota/shared/service/registro-ingreso/registro-ingreso.service';
import { CrearMascotaComponent } from './crear-mascota.component';
/* import { Mascota } from '@mascota/shared/model/mascota/mascota'; */

describe('CrearMascotaComponent', () => {
  let component: CrearMascotaComponent;
  let fixture: ComponentFixture<CrearMascotaComponent>;
  let mascotaService: MascotaService;

  /* let mascota = new Mascota(); */

  const dialogMock = {
    close: () => { }
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
        RegistroIngresoService,
        HttpService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearMascotaComponent);
    component = fixture.componentInstance;
    mascotaService = TestBed.inject(MascotaService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia cargar el titulo Registrar Mascota', () => {
    component.id = 'crear';
    component['cargarMascota']();
    expect('Registrar Mascota').toEqual(component.titulo);
  });

  it('deberia fabricar mascota', () => {
    component.mascotaForm.controls.nombre.setValue('Max');
    component.mascotaForm.controls.raza.setValue('Golden');
    component.mascotaForm.controls.peso.setValue('10Kg');
    component['fabricarMascota']();
    expect(component.mascotaForm.valid).toBeTruthy;

  });

  it('deberia guardar mascota', async() => {
    const spy = spyOn(mascotaService, 'guardar').and.callThrough();
    component.crear();
    expect(spy).toHaveBeenCalled();
  })

});
