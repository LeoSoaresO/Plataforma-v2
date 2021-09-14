import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigDisciplinesurmasComponent } from './config-disciplines.component';

describe('ConfigDisciplinesurmasComponent', () => {
  let component: ConfigDisciplinesurmasComponent;
  let fixture: ComponentFixture<ConfigDisciplinesurmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigDisciplinesurmasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigDisciplinesurmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
