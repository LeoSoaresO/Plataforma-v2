import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigTimetablesComponent } from './config-timetables.component';

describe('ConfigTimetablesComponent', () => {
  let component: ConfigTimetablesComponent;
  let fixture: ComponentFixture<ConfigTimetablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigTimetablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigTimetablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
