import { Component, OnInit } from '@angular/core';
import { Trm } from './shared/model/trm';
/* import { TrmService } from './shared/service/trm.service'; */

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public trm: Trm;

  constructor(
    /* private trmService: TrmService, */
  ) { }

  ngOnInit() {
    /* this.trmService.consultar().subscribe(
      trm => this.trm = trm
    ); */
  }

}
