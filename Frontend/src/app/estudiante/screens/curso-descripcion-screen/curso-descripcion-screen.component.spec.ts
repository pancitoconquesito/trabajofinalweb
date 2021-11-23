import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoDescripcionScreenComponent } from './curso-descripcion-screen.component';

describe('CursoDescripcionScreenComponent', () => {
  let component: CursoDescripcionScreenComponent;
  let fixture: ComponentFixture<CursoDescripcionScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoDescripcionScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoDescripcionScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
