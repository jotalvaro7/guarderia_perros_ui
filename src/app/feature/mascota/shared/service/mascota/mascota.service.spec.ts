import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';

import { UsuarioService } from '@usuario/shared/service/usuario.service';
import { RegistroIngresoService } from '../registro-ingreso/registro-ingreso.service';
import { FacturaService } from '@factura/shared/service/factura.service';
import { TrmService } from '@home/shared/service/trm.service';
import { MascotaService } from './mascota.service';
import { Mascota } from '../../model/mascota/mascota';

describe('MascotaService', () => {
  let httpMock: HttpTestingController;
  let service: MascotaService;

  const apiEndpointMascota = `${environment.endpoint}/mascotas`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MascotaService, UsuarioService, RegistroIngresoService, FacturaService, TrmService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(MascotaService);
  });

  it('should be created', () => {
    const productService: MascotaService = TestBed.inject(MascotaService);
    expect(productService).toBeTruthy();
  });

  it('deberia crer una mascota', () => {
    const dummyMascota = new Mascota();
    service.guardar(dummyMascota).subscribe(response => {
      expect(response).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointMascota);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({ body: true }));
  });

  it('deberia actualizar una mascota', () => {
    const dummyMascota = new Mascota();
    dummyMascota.id = 1;
    service.actualizar(dummyMascota).subscribe(reponse => {
      expect(reponse).toEqual(dummyMascota);
    });
    const req = httpMock.expectOne(`${apiEndpointMascota}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyMascota);
  });

  it('deberia eliminar una mascota', () => {
    const dummyMascota = new Mascota();
    dummyMascota.id = 1;
    service.eliminar(dummyMascota.id).subscribe(response => {
      expect(response).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointMascota}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({ body: true }));
  });

  it('deberia obtener una mascota por id', () => {
    const dummyMascota = new Mascota();
    dummyMascota.id = 1;
    service.consultarMascotaPorId(dummyMascota.id).subscribe(mascota => {
      expect(mascota).toEqual(dummyMascota);
    });
    const req = httpMock.expectOne(`${apiEndpointMascota}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMascota);
  });

  it('deberia listar mascotas de un usuario', () => {
    const dummyMascotas = [
      new Mascota(), new Mascota(), new Mascota()
    ];
    const dummyMascota = new Mascota();
    dummyMascota.idUsuario = 1;
    service.consultarMascotasPorIdUsuario(dummyMascota.idUsuario).subscribe(mascotas => {
      expect(mascotas.length).toBe(3);
      expect(mascotas).toEqual(dummyMascotas);
    });
    const req = httpMock.expectOne(`${apiEndpointMascota}/usuario/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMascotas);
  });

});
