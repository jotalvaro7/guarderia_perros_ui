import { Component, OnInit } from '@angular/core';
import { Mascota } from '@mascota/shared/model/mascota';
import { ActivatedRoute } from '@angular/router';
import { MascotaService } from '@mascota/shared/service/mascota.service';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.scss']
})
export class MascotaComponent implements OnInit {

  columnas: string[] = ['Id', 'Nombre', 'Raza', 'Peso', 'Editar', 'Borrar'];

  public mascotas: Mascota[];

  public idUsuario: number;
  public nombreUsuario: string;
  public apellidoUsuario: string;

  constructor(
    private mascotaService: MascotaService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.obtenerMascotasUsuario();
  }


  obtenerMascotasUsuario():void{
    this.activatedRoute.paramMap.subscribe((params) =>{
      this.nombreUsuario = params.get("nombreUsuario");
      this.apellidoUsuario = params.get("apellidoUsuario")
      this.idUsuario = +params.get("idUsuario");
      console.log(this.nombreUsuario, this.apellidoUsuario, this.idUsuario)
      this.mascotaService.consultarMascotasPorIdUsuario(this.idUsuario).subscribe(
        mascotas => this.mascotas = mascotas
      )
    })
    
  }

}
