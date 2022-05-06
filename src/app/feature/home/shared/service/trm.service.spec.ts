import { TestBed } from '@angular/core/testing';

import { TrmService } from './trm.service';

describe('TrmService', () => {
  let service: TrmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
