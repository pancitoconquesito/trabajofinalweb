import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarVisitanteComponent } from './navbar-visitante.component';

describe('NavbarVisitanteComponent', () => {
  let component: NavbarVisitanteComponent;
  let fixture: ComponentFixture<NavbarVisitanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarVisitanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarVisitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
