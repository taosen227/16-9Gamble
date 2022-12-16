import { TestBed } from '@angular/core/testing';

import { EnterNameService } from './enter-name.service';

describe('EnterNameService', () => {
  let service: EnterNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnterNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
