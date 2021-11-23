import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioScreensComponent } from './inicio-screens.component';

describe('InicioScreensComponent', () => {
  let component: InicioScreensComponent;
  let fixture: ComponentFixture<InicioScreensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioScreensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioScreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
