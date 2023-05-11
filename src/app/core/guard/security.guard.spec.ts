import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SecurityGuard } from './security.guard';

describe('SecurityGuard', () => {

  let guard: SecurityGuard;
  let router: Router;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [SecurityGuard]
    });

    guard = TestBed.inject(SecurityGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('#canActivate should return true if token is present', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('token');
    expect(guard.canActivate()).toBe(true);
  });

  it('#canActivate should navigate to /login if token is not present', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);
    spyOn(router, 'navigate');

    guard.canActivate();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
