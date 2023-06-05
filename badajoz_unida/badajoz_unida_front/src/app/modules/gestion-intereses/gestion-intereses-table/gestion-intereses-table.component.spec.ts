import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionInteresesTableComponent } from './gestion-intereses-table.component';

describe('GestionInteresesTableComponent', () => {
  let component: GestionInteresesTableComponent;
  let fixture: ComponentFixture<GestionInteresesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionInteresesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionInteresesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
