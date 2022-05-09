import { of } from 'rxjs';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '@shared/material/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';

import { Factura } from '@factura/shared/model/factura';
import { FacturaService } from '@factura/shared/service/factura.service';
import { FacturaComponent } from './factura.component';

describe('FacturaComponent', () => {
  let component: FacturaComponent;
  let fixture: ComponentFixture<FacturaComponent>;


  const dialogMock = {
    close: () => { }
  };

  let facturaService: FacturaService;

  const factura = new Factura(
    'Cristal',
    '2022-05-06 09:27:35',
    '2022-05-06 18:31:36',
    'Su mascota ha estado en nuestra guarderia por: 0 semana(s), 0 dia(s), 9 hora(s), 4 minuto(s)',
    135000);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FacturaComponent],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule,
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
        FacturaService,
        HttpService
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaComponent);
    component = fixture.componentInstance;
    facturaService = TestBed.inject(FacturaService);
    spyOn(facturaService, 'consultar').and.returnValue(of(factura));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia cobrar la Factura de una mascota', () => {
    const spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.cobrar();
    expect(spy).toHaveBeenCalled();
  });

  it('deberia cerrar el dialogRef cuando da click en cancelar', () => {
    const spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.cancelar();
    expect(spy).toHaveBeenCalled();
  });
});
