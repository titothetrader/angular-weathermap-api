import { TestBed } from '@angular/core/testing';

import { CallWeatherAPIService } from './call-weather-api.service';

describe('CallWeatherAPIService', () => {
  let service: CallWeatherAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallWeatherAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
