import { TestBed } from '@angular/core/testing';

import { CompraProductoService } from './compra-producto.service';

describe('CompraProductoService', () => {
  let service: CompraProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompraProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
