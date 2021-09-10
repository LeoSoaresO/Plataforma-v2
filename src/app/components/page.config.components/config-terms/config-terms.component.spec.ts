import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigTermsComponent } from './config-terms.component';

describe('ConfigTermsComponent', () => {
  let component: ConfigTermsComponent;
  let fixture: ComponentFixture<ConfigTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigTermsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
