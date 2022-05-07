import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../model/usuario';

describe('UsuarioService', () => {
  let httpMock: HttpTestingController;
  let service: UsuarioService;

  const apiEndpointUsuario = `${environment.endpoint}/usuarios`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuarioService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(UsuarioService);
  });

  it('should be created', () => {
    const productService: UsuarioService = TestBed.inject(UsuarioService);
    expect(productService).toBeTruthy();
  });

  it('deberia crear un usuario', () => {
    const dummyUsuario = new Usuario('Julio' , 'Osorio', '103694987', '34725812');
    service.guardar(dummyUsuario).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointUsuario);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({ body: true }));
  });

  it('deberia actualizar un usuario', () => {
    const dummyUsuario = new Usuario('Julio' , 'Osorio', '103694987', '34725812');
    dummyUsuario.id = 1;
    service.editar(dummyUsuario).subscribe(response => {
      expect(response).toEqual(dummyUsuario);
    });
    const req = httpMock.expectOne(`${apiEndpointUsuario}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyUsuario);
  });

  it('deberia eliminar un usuario', () => {
    const dummyUsuario = new Usuario('Julio' , 'Osorio', '103694987', '34725812');
    dummyUsuario.id = 1;
    service.eliminar(dummyUsuario.id).subscribe(response => {
      expect(response).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointUsuario}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({ body: true }));
  });

  it('deberia listar usuarios', () => {
    const dummyUsuarios = [
      new Usuario('Julio' , 'Osorio', '103694987', '34725812'),
      new Usuario('Luisa' , 'Severino', '10369768', '55544421')
    ];
    service.consultar().subscribe(usuarios => {
      expect(usuarios.length).toBe(2);
      expect(usuarios).toEqual(dummyUsuarios);
    });
    const req = httpMock.expectOne(apiEndpointUsuario);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsuarios);
  });

  it('deberia obtener un usuario por id', () => {
    const dummyUsuarios = new Usuario('Julio' , 'Osorio', '103694987', '34725812');
    dummyUsuarios.id = 1;
    service.consultarPorId(dummyUsuarios.id).subscribe(response => {
      expect(response).toEqual(dummyUsuarios);
    });
    const req = httpMock.expectOne(`${apiEndpointUsuario}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsuarios);
  });
});
