import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const token = sessionStorage.getItem('access_token') || localStorage.getItem('access_token');
    
    if (token) {
      // Si el token existe, permite el acceso a la ruta.
      return true;
    } else {
      // Si el token no existe, redirige al usuario a la página de inicio de sesión.
      return this.router.navigate(['/login']);
    }
  }

}
