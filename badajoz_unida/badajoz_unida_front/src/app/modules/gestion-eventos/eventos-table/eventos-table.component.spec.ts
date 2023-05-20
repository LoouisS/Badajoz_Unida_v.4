import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosTableComponent } from './eventos-table.component';

describe('EventosTableComponent', () => {
  let component: EventosTableComponent;
  let fixture: ComponentFixture<EventosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
