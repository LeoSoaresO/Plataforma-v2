import { TestBed } from '@angular/core/testing';

import { SettingsGeneralService } from './settings-general.service';

describe('SettingsGeneralService', () => {
  let service: SettingsGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
