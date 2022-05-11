import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '@usuario/shared/model/usuario';
import { UsuarioService } from '@usuario/shared/service/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { CrudUsuarioComponent } from '../crud-usuario/crud-usuario.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  columnas: string[] = ['#', 'Nombre', 'Apellido', 'Identificacion',
    'Numero de celular', 'Mascotas', 'Editar', 'Borrar'
  ];
  public usuarios: Usuario[];
  public usuario: Usuario;
  public dataSource: any;

  constructor(
    protected usuarioService: UsuarioService,
    private dialog: MatDialog,
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.usuarioService.notificar.subscribe(response => {
      console.log(`Desde el subscritor del emisor event ${response}`);
      this.obtenerUsuarios();
    });
  }

  obtenerUsuarios(): void {
    this.usuarioService.consultar().subscribe(
      usuarios => {
        this.usuarios = usuarios;
        this.dataSource = new MatTableDataSource(this.usuarios);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  public crear(action: string) {
    this.dialog.open(CrudUsuarioComponent, {
      width: '20%',
      autoFocus: true,
      data: { id: action }
    });
  }

  public editar(id: number): void {
    this.dialog.open(CrudUsuarioComponent, {
      width: '20%',
      autoFocus: true,
      data: { id }
    });
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
              this.usuarioService.notificar.emit();
              swalWithBootstrapButtons.fire({
                icon: 'success',
                title: 'Usuario Eliminado!',
                text: `El Usuario se ha eliminado con éxito de la base de datos`,
              });
            }
          }
        );
      }
    });
  }


}
