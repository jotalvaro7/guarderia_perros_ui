import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';

import { RegistroIngresoService } from '@registro-ingreso-mascota/shared/service/registro-ingreso.service';
import { CrearRegistroIngresoMascotaComponent } from './crear-registro-ingreso-mascota.component';

describe('CrearRegistroIngresoMascotaComponent', () => {
  let component: CrearRegistroIngresoMascotaComponent;
  let fixture: ComponentFixture<CrearRegistroIngresoMascotaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearRegistroIngresoMascotaComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [HttpService, RegistroIngresoService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearRegistroIngresoMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*   it('deberia registar Ingreso de mascota', () => {
    const spy = spyOn(registroIngresoService, 'guardar').and.callThrough();
    idMascotaResponse.valor = 1;
    component.registrarIngresoMascota(idMascotaResponse);
    expect(spy).toHaveBeenCalled();
  }); */
});
