import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';

import { FacturaService } from './factura.service';
import { Factura } from '../model/factura';

describe('FacturaService', () => {
  let httpMock: HttpTestingController;
  let service: FacturaService;

  const apiEndpointFactura = `${environment.endpoint}/cobrar`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FacturaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(FacturaService);
  });

  it('should be created', () => {
    const productService: FacturaService = TestBed.inject(FacturaService);
    expect(productService).toBeTruthy();
  });

  it('deberia obtener la factura de cobro', () => {
    const dummyFactura = new Factura(
      'Cristal', 
      '2022-05-06 09:27:35', 
      '2022-05-06 18:31:36', 
      'Su mascota ha estado en nuestra guarderia por: 0 semana(s), 0 dia(s), 9 hora(s), 4 minuto(s)',
      135000
    );
    const mascotaId = 1;
    service.consultar(mascotaId).subscribe(response => {
      expect(response).toEqual(dummyFactura);
    });
    const req = httpMock.expectOne(`${apiEndpointFactura}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyFactura);
  });
});
