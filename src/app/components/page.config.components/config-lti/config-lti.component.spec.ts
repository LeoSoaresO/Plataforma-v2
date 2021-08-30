import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigLtiComponent } from './config-lti.component';

describe('ConfigLtiComponent', () => {
  let component: ConfigLtiComponent;
  let fixture: ComponentFixture<ConfigLtiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigLtiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigLtiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
