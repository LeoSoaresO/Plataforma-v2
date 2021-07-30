import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigLoginComponent } from './config-login.component';

describe('ConfigLoginComponent', () => {
  let component: ConfigLoginComponent;
  let fixture: ComponentFixture<ConfigLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
