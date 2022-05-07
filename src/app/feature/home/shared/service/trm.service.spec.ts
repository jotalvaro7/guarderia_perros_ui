import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { HttpService } from '@core/services/http.service';

import { TrmService } from './trm.service';
import { Trm } from '../model/trm';

describe('TrmService', () => {
  let httpMock: HttpTestingController;
  let service: TrmService;

  const apiEndpointTrm = `${environment.endpoint}/trm`;

  beforeEach(() => {
      const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrmService, HttpService]
    });
    service = TestBed.inject(TrmService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    const productService: TrmService = TestBed.inject(TrmService);
    expect(productService).toBeTruthy();
  });

  it('deberia obtener el Trm del dia actual', () => {
    const dummyTrm = new Trm('1234','COP','2022-05-04T00:00:00-05:00', '2022-05-04T00:00:00-05:00', '4016.34', 'true');
    service.consultar().subscribe(response => {
      expect(response).toEqual(dummyTrm);
    });
    const req = httpMock.expectOne(`${apiEndpointTrm}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTrm);
  });
});
