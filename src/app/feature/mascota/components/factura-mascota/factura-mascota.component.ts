import { Component, OnInit } from '@angular/core';
import { idResponse } from '@mascota/shared/model/idResponse';
import { MascotaService } from '@mascota/shared/service/mascota/mascota.service';

@Component({
  selector: 'app-factura-mascota',
  templateUrl: './factura-mascota.component.html',
  styleUrls: ['./factura-mascota.component.scss']
})
export class FacturaMascotaComponent implements OnInit {

  constructor(
    private mascotaService: MascotaService,
  ) { }

  ngOnInit(): void {
    this.mascotaService.notificar.subscribe((reponse:idResponse) =>{
      console.log()
      console.log(reponse)
    })
  }

}
