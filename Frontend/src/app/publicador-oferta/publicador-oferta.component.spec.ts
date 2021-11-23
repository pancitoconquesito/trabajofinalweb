import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicadorOfertaComponent } from './publicador-oferta.component';

describe('PublicadorOfertaComponent', () => {
  let component: PublicadorOfertaComponent;
  let fixture: ComponentFixture<PublicadorOfertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicadorOfertaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicadorOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
