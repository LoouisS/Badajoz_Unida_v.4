import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionInteresesComponent } from './gestion-intereses.component';

describe('GestionInteresesComponent', () => {
  let component: GestionInteresesComponent;
  let fixture: ComponentFixture<GestionInteresesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionInteresesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionInteresesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
