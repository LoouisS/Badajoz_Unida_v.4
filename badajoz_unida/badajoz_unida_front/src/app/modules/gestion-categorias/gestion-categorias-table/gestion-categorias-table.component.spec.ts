import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCategoriasTableComponent } from './gestion-categorias-table.component';

describe('GestionCategoriasTableComponent', () => {
  let component: GestionCategoriasTableComponent;
  let fixture: ComponentFixture<GestionCategoriasTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCategoriasTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCategoriasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
