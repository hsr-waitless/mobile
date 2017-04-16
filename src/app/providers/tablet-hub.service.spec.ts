import { TestBed, inject } from '@angular/core/testing';

import { TabletHubService } from './tablet-hub.service';

describe('TabletHubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TabletHubService]
    });
  });

  it('should ...', inject([TabletHubService], (service: TabletHubService) => {
    expect(service).toBeTruthy();
  }));
});
