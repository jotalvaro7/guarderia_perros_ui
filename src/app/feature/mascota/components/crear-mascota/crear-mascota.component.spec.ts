import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { MaterialModule } from '@shared/material/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '@usuario/shared/service/usuario.service';
import { MascotaService } from '@mascota/shared/service/mascota/mascota.service';
import { TrmService } from '@home/shared/service/trm.service';
import { FacturaService } from '@factura/shared/service/factura.service';
import { CrearMascotaComponent } from './crear-mascota.component';

describe('CrearMascotaComponent', () => {
  let component: CrearMascotaComponent;
  let fixture: ComponentFixture<CrearMascotaComponent>;

  beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
      declarations: [CrearMascotaComponent],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,

      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        {
          provide: MatDialogRef,
          useValue: {}
        },
        MascotaService,
        UsuarioService,
        FacturaService,
        TrmService,
        HttpService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
