import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ObtenerImagenService } from './obtener-imagen.service';
import { HttpService } from '../../../core/services/http.service';
import { of } from 'rxjs';

describe('ObtenerImagenService', () => {
  let service: ObtenerImagenService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpService', ['doGetImage']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ObtenerImagenService,
        {provide: HttpService, useValue: spy}
      ]
    });
    service = TestBed.inject(ObtenerImagenService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#obtenerImagenPorId should return stubbed value from a spy', () => {
    const stubValue = of('stub');
    httpServiceSpy.doGetImage.and.returnValue(stubValue);

    const dummyId = 1;

    service.obtenerImagenPorId(dummyId).subscribe(value => {
      expect(value).toEqual('stub');
      expect(httpServiceSpy.doGetImage.calls.count())
        .toBe(1, 'spy method was called once');
      expect(httpServiceSpy.doGetImage.calls.first().args[0])
        .toBe(`/products/api/v1/image/${dummyId}`, 'spy method was called with right argument');
    });
  });
});
