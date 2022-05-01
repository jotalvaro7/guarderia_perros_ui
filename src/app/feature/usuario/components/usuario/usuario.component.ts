import { Component, OnInit } from '@angular/core';
import { Usuario } from '@usuario/shared/model/usuario';
import { UsuarioService } from '@usuario/shared/service/usuario.service';

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
  public usuarioSeleccionado: Usuario;

  constructor(
    protected usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios():void{
    this.usuarioService.consultar().subscribe(
      usuarios => this.usuarios = usuarios
    )
  }

  public crear(){
    this.usuarioSeleccionado = new Usuario();
    this.usuarioService.abrilModal();
  }

  public editar(usuario: Usuario): void{
    console.log(usuario);
  }

  public eliminar(usuario: Usuario): void{
    console.log(usuario);
  }


  closeDialog(){
    this.usuarioService.cerrarModal();
  }


}
