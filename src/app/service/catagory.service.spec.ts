import { TestBed } from '@angular/core/testing';

import { CatagoryService } from './catagory.service';

describe('CatagoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatagoryService = TestBed.get(CatagoryService);
    expect(service).toBeTruthy();
  });
});
