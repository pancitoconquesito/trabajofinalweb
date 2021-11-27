import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaDetalleScreenComponent } from './oferta-detalle-screen.component';

describe('OfertaDetalleScreenComponent', () => {
  let component: OfertaDetalleScreenComponent;
  let fixture: ComponentFixture<OfertaDetalleScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertaDetalleScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaDetalleScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
