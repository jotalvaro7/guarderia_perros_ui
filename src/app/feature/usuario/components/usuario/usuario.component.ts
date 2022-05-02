import { Component, OnInit } from '@angular/core';
import { Usuario } from '@usuario/shared/model/usuario';
import { UsuarioService } from '@usuario/shared/service/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  columnas: string[] = ['Id', 'Nombre', 'Apellido', 'Identificacion', 
                        'Numero de celular', "Editar", "Borrar"
                      ];
  public usuarios: Usuario[];
  public usuario:Usuario;

  constructor(
    protected usuarioService: UsuarioService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.usuarioService.notificar.subscribe(response =>{
      console.log(`Desde el subscritor del emisor event ${response}`);
      this.obtenerUsuarios();
    })
  }

  obtenerUsuarios():void{
    this.usuarioService.consultar().subscribe(
      usuarios => this.usuarios = usuarios
    )
  }

  public crear(action: string){
    this.dialog.open(CrearUsuarioComponent, {
      width: "20%",
      autoFocus: true,
      data: {id:action}
    })
  }

  public editar(id:Number): void{
    this.dialog.open(CrearUsuarioComponent, {
      width: "20%",
      autoFocus: true,
      data: {id:id}
    })
  }

  public eliminar(usuario: Usuario): void{
    console.log(usuario);
  }


}
