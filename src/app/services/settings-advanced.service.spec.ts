import { TestBed } from '@angular/core/testing';

import { SettingsAdvancedService } from './settings-advanced.service';

describe('SettingsAdvancedService', () => {
  let service: SettingsAdvancedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsAdvancedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
