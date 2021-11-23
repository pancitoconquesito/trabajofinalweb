import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoActualScreenComponent } from './curso-actual-screen.component';

describe('CursoActualScreenComponent', () => {
  let component: CursoActualScreenComponent;
  let fixture: ComponentFixture<CursoActualScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoActualScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoActualScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
