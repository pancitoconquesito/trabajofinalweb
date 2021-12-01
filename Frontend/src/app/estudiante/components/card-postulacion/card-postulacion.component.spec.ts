import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPostulacionComponent } from './card-postulacion.component';

describe('CardPostulacionComponent', () => {
  let component: CardPostulacionComponent;
  let fixture: ComponentFixture<CardPostulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPostulacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPostulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
