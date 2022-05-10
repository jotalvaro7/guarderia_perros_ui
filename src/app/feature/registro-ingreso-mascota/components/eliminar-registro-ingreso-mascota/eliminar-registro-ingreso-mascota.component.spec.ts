import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';

import { RegistroIngresoService } from '@registro-ingreso-mascota/shared/service/registro-ingreso.service';
import { EliminarRegistroIngresoMascotaComponent } from './eliminar-registro-ingreso-mascota.component';

describe('EliminarRegistroIngresoMascotaComponent', () => {
  let component: EliminarRegistroIngresoMascotaComponent;
  let fixture: ComponentFixture<EliminarRegistroIngresoMascotaComponent>;
  let registroIngresoService: RegistroIngresoService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarRegistroIngresoMascotaComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [HttpService, RegistroIngresoService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarRegistroIngresoMascotaComponent);
    component = fixture.componentInstance;
    registroIngresoService = TestBed.inject(RegistroIngresoService);
    spyOn(registroIngresoService, 'eliminar');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
