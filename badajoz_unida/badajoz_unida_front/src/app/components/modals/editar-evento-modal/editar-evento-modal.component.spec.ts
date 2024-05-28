import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEventoModalComponent } from './crear-evento-modal.component';

describe('CrearEventoModalComponent', () => {
  let component: CrearEventoModalComponent;
  let fixture: ComponentFixture<CrearEventoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEventoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEventoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
