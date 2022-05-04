import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {environment} from 'src/environments/environment';
import {HttpService} from 'src/app/core/services/http.service';

import { FacturaService } from './factura.service';
import {Factura} from '../model/factura';

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
    const dummyFactura = new Factura();
    
    service.consultar(1).subscribe(response => {
      expect(response).toEqual(dummyFactura);
    });
    const req = httpMock.expectOne(`${apiEndpointFactura}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyFactura);
  });
});
