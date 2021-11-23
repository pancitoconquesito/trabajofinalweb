import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasScreenComponent } from './ofertas-screen.component';

describe('OfertasScreenComponent', () => {
  let component: OfertasScreenComponent;
  let fixture: ComponentFixture<OfertasScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertasScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertasScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
