import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '@shared/material/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MascotaService } from '@mascota/shared/service/mascota/mascota.service';
import { FacturaService } from '@factura/shared/service/factura.service';
import { RegistroIngresoService } from '@mascota/shared/service/registro-ingreso/registro-ingreso.service';
import { MascotaComponent } from './mascota.component';
import { of } from 'rxjs';
import { Mascota } from '@mascota/shared/model/mascota/mascota';

describe('MascotaComponent', () => {
  let component: MascotaComponent;
  let fixture: ComponentFixture<MascotaComponent>;
  let mascotaService: MascotaService;

  /* let spyMascotaServiceConsultarMascotasDeUsuario: jasmine.Spy;
 */
  let mascotas: Mascota[] = [
    {
      id: 1,
      nombre: "Raz",
      raza: 'Pumeraña',
      peso: '5Kg',
      idUsuario: 1
    }
  ]

  beforeEach(waitForAsync (() => {
      TestBed.configureTestingModule({
      declarations: [ MascotaComponent ],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      providers: [MascotaService, HttpService, RegistroIngresoService, FacturaService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotaComponent);
    component = fixture.componentInstance;
    mascotaService = TestBed.inject(MascotaService);
    spyOn(mascotaService, 'consultarMascotasPorIdUsuario').and.returnValue(of(mascotas))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
