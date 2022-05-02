import { Component, OnInit } from '@angular/core';
import { Mascota } from '@mascota/shared/model/mascota';
import { ActivatedRoute } from '@angular/router';
import { MascotaService } from '@mascota/shared/service/mascota.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearMascotaComponent } from '../crear-mascota/crear-mascota.component';

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
    private dialog: MatDialog,
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

  public crear(action:string){
    this.dialog.open(CrearMascotaComponent, {
      width: "20%",
      autoFocus: true,
      data:{id:action}
    })
  }

  public editar(id:Number){
    this.dialog.open(CrearMascotaComponent,{
      width: "20%",
      autoFocus: true,
      data:{id:id, idUsuario:this.idUsuario}
    })
  }

}
