import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCursoScreenComponent } from './crear-curso-screen.component';

describe('CrearCursoScreenComponent', () => {
  let component: CrearCursoScreenComponent;
  let fixture: ComponentFixture<CrearCursoScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCursoScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCursoScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
