import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigGeraisComponent } from './config-gerais.component';

describe('ConfigGeraisComponent', () => {
  let component: ConfigGeraisComponent;
  let fixture: ComponentFixture<ConfigGeraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigGeraisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigGeraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
