import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { BrowserConfigService } from './browser-config.service';

describe('BrowserConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ BrowserConfigService ]
    });
  });

  it('should create', inject([ BrowserConfigService ], (service: BrowserConfigService) => {
    expect(service).toBeTruthy();
  }));

  it('should store data in localstorage', inject([ BrowserConfigService ], (service: BrowserConfigService) => {
    service.set('key', 'somevalue');
    expect(localStorage.getItem('key')).toBe('somevalue');
  }));

  it('should fetch data from localstorage', inject([ BrowserConfigService ], fakeAsync((service: BrowserConfigService) => {
    localStorage.setItem('otherkey', 'othervalue');
    let called = false;
    service.get('otherkey').subscribe(value => {
      expect(value).toBe('othervalue');
      called = true;
    });
    tick();
    expect(called).toBeTruthy();
  })));

  it('should update get observable', inject([ BrowserConfigService ], fakeAsync((service: BrowserConfigService) => {

    let called = 0;
    service.set('somekey', 'somevalue');
    service.get('somekey').subscribe(value => {
      if (called === 0) {
        expect(value).toBe('somevalue');
      } else if (called === 1) {
        expect(value).toBe('somenewvalue');
      } else {
        fail('observable should not be called more than 2 times');
      }

      called++;
    });
    tick();
    expect(called).toBe(1);
    service.set('somekey', 'somenewvalue');
    tick();
    expect(called).toBe(2);
    tick();
  })));

});
