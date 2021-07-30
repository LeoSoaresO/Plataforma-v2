import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigCamposCustomizadosComponent } from './config-campos-customizados.component';

describe('ConfigCamposCustomizadosComponent', () => {
  let component: ConfigCamposCustomizadosComponent;
  let fixture: ComponentFixture<ConfigCamposCustomizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigCamposCustomizadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigCamposCustomizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
