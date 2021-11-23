import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegPublicadorOfertaLaboralComponent } from './reg-publicador-oferta-laboral.component';

describe('RegPublicadorOfertaLaboralComponent', () => {
  let component: RegPublicadorOfertaLaboralComponent;
  let fixture: ComponentFixture<RegPublicadorOfertaLaboralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegPublicadorOfertaLaboralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegPublicadorOfertaLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
