import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionScreenComponent } from './configuracion-screen.component';

describe('ConfiguracionScreenComponent', () => {
  let component: ConfiguracionScreenComponent;
  let fixture: ComponentFixture<ConfiguracionScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguracionScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
