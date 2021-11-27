import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModuloScreenComponent } from './crear-modulo-screen.component';

describe('CrearModuloScreenComponent', () => {
  let component: CrearModuloScreenComponent;
  let fixture: ComponentFixture<CrearModuloScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearModuloScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearModuloScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
