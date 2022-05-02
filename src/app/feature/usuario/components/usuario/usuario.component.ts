import { Component, OnInit } from '@angular/core';
import { Usuario } from '@usuario/shared/model/usuario';
import { UsuarioService } from '@usuario/shared/service/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';
import Swal from 'sweetalert2';

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
  public usuario: Usuario;

  constructor(
    protected usuarioService: UsuarioService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.usuarioService.notificar.subscribe(response => {
      console.log(`Desde el subscritor del emisor event ${response}`);
      this.obtenerUsuarios();
    })
  }

  obtenerUsuarios(): void {
    this.usuarioService.consultar().subscribe(
      usuarios => this.usuarios = usuarios
    )
  }

  public crear(action: string) {
    this.dialog.open(CrearUsuarioComponent, {
      width: "20%",
      autoFocus: true,
      data: { id: action }
    })
  }

  public editar(id: Number): void {
    this.dialog.open(CrearUsuarioComponent, {
      width: "20%",
      autoFocus: true,
      data: { id: id }
    })
  }

  public delete(usuario: Usuario): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      background: "#444",
      color: "#fff",
      title: 'Cuidado!',
      text: `Está seguro de eliminar el usuario ${usuario.nombre} ${usuario.apellido} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminar(usuario.id).subscribe(
          response => {
            if (!response) {
              this.usuarios = this.usuarios.filter(cli => cli !== usuario);
              swalWithBootstrapButtons.fire({
                background: "#444",
                color: "#fff",
                icon: 'success',
                title: 'Usuario Eliminado!',
                text: `El usuario se ha eliminado con éxito de la base de datos`,
              });
            }
          },
          err => {
            Swal.fire(err.error.mensaje, 'Nombre de la excepción: ' + err.error.nombreExcepcion, 'error');
          });
      }
    });
  }


}
