import { TestBed } from '@angular/core/testing';

import { HourlyForecastService } from './hourly-forecast.service';

describe('HourlyForecastService', () => {
  let service: HourlyForecastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HourlyForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
