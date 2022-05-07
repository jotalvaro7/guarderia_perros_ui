import { of } from 'rxjs';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@shared/material/material-module';
import { HttpService } from '@core/services/http.service';
import { TrmService } from './shared/service/trm.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home.component';
import { Trm } from './shared/model/trm';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let trmService: TrmService;
  let trm: Trm = new Trm('1234','COP','2022-05-04T00:00:00-05:00', '2022-05-04T00:00:00-05:00', '4016.34', 'true');

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [HttpService, TrmService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    trmService = TestBed.inject(TrmService);
    spyOn(trmService, 'consultar').and.returnValue(of(trm));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
