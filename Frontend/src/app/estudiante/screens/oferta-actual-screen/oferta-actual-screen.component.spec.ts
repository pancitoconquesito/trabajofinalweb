import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaActualScreenComponent } from './oferta-actual-screen.component';

describe('OfertaActualScreenComponent', () => {
  let component: OfertaActualScreenComponent;
  let fixture: ComponentFixture<OfertaActualScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertaActualScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaActualScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
