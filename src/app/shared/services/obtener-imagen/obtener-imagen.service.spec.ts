import { TestBed } from '@angular/core/testing';

import { ObtenerImagenService } from './obtener-imagen.service';

describe('ObtenerImagenService', () => {
  let service: ObtenerImagenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtenerImagenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
