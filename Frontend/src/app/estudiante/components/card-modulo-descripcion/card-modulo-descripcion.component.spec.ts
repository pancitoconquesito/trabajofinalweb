import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardModuloDescripcionComponent } from './card-modulo-descripcion.component';

describe('CardModuloDescripcionComponent', () => {
  let component: CardModuloDescripcionComponent;
  let fixture: ComponentFixture<CardModuloDescripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardModuloDescripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardModuloDescripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
