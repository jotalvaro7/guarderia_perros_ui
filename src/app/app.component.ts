import { Component } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Guarderia Mascotas';
  public menu_navigation: MenuItem[] = [
    { url: '/home', nombre: 'Home' },
    { url: '/usuario', nombre: 'Usuarios' }
    
  ];

  
}
