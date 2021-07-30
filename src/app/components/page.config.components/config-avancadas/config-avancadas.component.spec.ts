import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigAvancadasComponent } from './config-avancadas.component';

describe('ConfigAvancadasComponent', () => {
  let component: ConfigAvancadasComponent;
  let fixture: ComponentFixture<ConfigAvancadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigAvancadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigAvancadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
