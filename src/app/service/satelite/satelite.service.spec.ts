import { TestBed } from '@angular/core/testing';

import { SateliteService } from './satelite.service';

describe('SateliteService', () => {
  let service: SateliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SateliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
