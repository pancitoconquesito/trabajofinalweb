import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardModuloComponent } from './card-modulo.component';

describe('CardModuloComponent', () => {
  let component: CardModuloComponent;
  let fixture: ComponentFixture<CardModuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardModuloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
