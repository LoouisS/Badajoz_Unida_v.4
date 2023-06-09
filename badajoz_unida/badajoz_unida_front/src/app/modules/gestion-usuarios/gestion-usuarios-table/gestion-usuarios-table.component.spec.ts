import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionUsuariosTableComponent } from './gestion-usuarios-table.component';

describe('GestionUsuariosTableComponent', () => {
  let component: GestionUsuariosTableComponent;
  let fixture: ComponentFixture<GestionUsuariosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionUsuariosTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionUsuariosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
