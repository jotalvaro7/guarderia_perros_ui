import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaMascotaComponent } from './factura-mascota.component';

describe('FacturaMascotaComponent', () => {
  let component: FacturaMascotaComponent;
  let fixture: ComponentFixture<FacturaMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaMascotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
