import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigTurmasComponent } from './config-turmas.component';

describe('ConfigTurmasComponent', () => {
  let component: ConfigTurmasComponent;
  let fixture: ComponentFixture<ConfigTurmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigTurmasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigTurmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
