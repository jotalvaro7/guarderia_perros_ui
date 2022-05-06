import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { RegistroIngresoService } from './registro-ingreso.service';
import { RegistroIngreso } from '../../model/registro-ingreso/registro-ingreso';

describe('RegistroIngresoService', () => {
  let httpMock: HttpTestingController;
  let service: RegistroIngresoService;

  const apiEndpointRegistro = `${environment.endpoint}/registro/ingreso`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegistroIngresoService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(RegistroIngresoService);
  });

  it('should be created', () => {
    const productService: RegistroIngresoService = TestBed.inject(RegistroIngresoService);
    expect(productService).toBeTruthy();
  });

  it('deberia crear un registro de ingreso', () => {
    const dummyRegistroIngreso = new RegistroIngreso();
    service.guardar(dummyRegistroIngreso).subscribe(response => {
      expect(response).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointRegistro);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({ body: true }));
  });

  it('deberia eliminar un registro de ingreso', () => {
    const dummyRegistroIngreso = new RegistroIngreso();
    dummyRegistroIngreso.idMascota = 1;
    service.eliminar(dummyRegistroIngreso.idMascota).subscribe(response => {
      expect(response).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointRegistro}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({ body: true }));
  });
});
