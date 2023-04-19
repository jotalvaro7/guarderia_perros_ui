import { Component, OnInit } from '@angular/core';
import { MenuItem } from '@shared/components/navbar/model/menu-item';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
  title = 'Guarderia Mascotas';
  public menuNavigation: MenuItem[] = [
    { url: '/producto', nombre: 'Home' },
  ];

}
