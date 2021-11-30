import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMiOfertaComponent } from './card-mi-oferta.component';

describe('CardMiOfertaComponent', () => {
  let component: CardMiOfertaComponent;
  let fixture: ComponentFixture<CardMiOfertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardMiOfertaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMiOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
