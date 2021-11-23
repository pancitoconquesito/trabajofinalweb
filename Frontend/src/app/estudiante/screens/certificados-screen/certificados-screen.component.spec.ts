import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadosScreenComponent } from './certificados-screen.component';

describe('CertificadosScreenComponent', () => {
  let component: CertificadosScreenComponent;
  let fixture: ComponentFixture<CertificadosScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificadosScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadosScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
