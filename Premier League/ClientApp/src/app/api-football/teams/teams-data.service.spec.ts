import { TestBed } from '@angular/core/testing';

import { TeamsDataService } from './teams-data.service';

describe('TeamsDataService', () => {
  let service: TeamsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
