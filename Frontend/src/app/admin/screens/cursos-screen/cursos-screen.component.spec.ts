import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosScreenComponent } from './cursos-screen.component';

describe('CursosScreenComponent', () => {
  let component: CursosScreenComponent;
  let fixture: ComponentFixture<CursosScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursosScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
