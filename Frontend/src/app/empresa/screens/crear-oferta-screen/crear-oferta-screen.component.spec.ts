import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearOfertaScreenComponent } from './crear-oferta-screen.component';

describe('CrearOfertaScreenComponent', () => {
  let component: CrearOfertaScreenComponent;
  let fixture: ComponentFixture<CrearOfertaScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearOfertaScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearOfertaScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
