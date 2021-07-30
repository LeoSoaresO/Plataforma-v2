import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigIntegracoesComponent } from './config-integracoes.component';

describe('ConfigIntegracoesComponent', () => {
  let component: ConfigIntegracoesComponent;
  let fixture: ComponentFixture<ConfigIntegracoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigIntegracoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigIntegracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
