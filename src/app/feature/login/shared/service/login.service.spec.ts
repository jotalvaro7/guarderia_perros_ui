import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { HttpService } from '@core/services/http.service';
import { CredencialesDeUsuario } from '../model/credencialesDeUsuario';
import { of } from 'rxjs';

describe('LoginService', () => {
  let service: TestLoginService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  class TestLoginService extends LoginService {
    get httpService() {
      return this.http;
    }
  }

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpService', ['doPost', 'optsName']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TestLoginService,
        { provide: LoginService, useExisting: TestLoginService },
        { provide: HttpService, useValue: spy }
      ]
    });

    service = TestBed.inject(TestLoginService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#obtenerToken should return stubbed value from a spy', () => {
    const stubValue = of('stub');
    httpServiceSpy.doPost.and.returnValue(stubValue);
    httpServiceSpy.optsName.and.returnValue({});

    const dummyCredenciales: CredencialesDeUsuario = { username: 'test', password: 'test' };

    service.obtenerToken(dummyCredenciales).subscribe(value => {
      expect(value).toEqual('stub');
      expect(httpServiceSpy.doPost.calls.count())
        .toBe(1, 'spy method was called once');
      expect(httpServiceSpy.doPost.calls.first().args[0])
        .toBe('/api/security/oauth/login', 'spy method was called with right argument');
      expect(httpServiceSpy.doPost.calls.first().args[1])
        .toEqual(dummyCredenciales, 'spy method was called with right argument');
      expect(httpServiceSpy.doPost.calls.first().args[2])
        .toEqual(service.httpService.optsName('obtener token'), 'spy method was called with right argument');
    });
  });
});
