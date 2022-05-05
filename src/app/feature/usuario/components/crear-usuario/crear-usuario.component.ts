import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '@usuario/shared/model/usuario';
import { UsuarioService } from '@usuario/shared/service/usuario.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {


  public usuarioForm: FormGroup;
  public usuario: Usuario;
  public titulo: string;
  public id: any;
  private crearClicked: boolean;

  constructor(
    public dialogRef: MatDialogRef<CrearUsuarioComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UsuarioService,

  ) {
    this.id = data.id;
    this.crearClicked = false;
  }

  ngOnInit(): void {
    this.usuario = new Usuario();
    this.construirFormularioUsuario();
    this.cargarUsuario();
  }

  private construirFormularioUsuario() {
    this.usuarioForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      identificacion: new FormControl('', [Validators.required]),
      numeroCelular: new FormControl('', [Validators.required]),
    });
  }

  private cargarUsuario(): void {
    if (this.id === 'crear') {
      this.titulo = 'Registrar Usuario';
    } else {
      this.titulo = 'Actualizar Usuario';
      this.usuarioService.consultarPorId(this.id).subscribe(usuario => {
        this.usuario = usuario;
        this.setValue();
      });
    }
  }

  private setValue(): void {
    this.usuarioForm.setValue({
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      identificacion: this.usuario.identificacion,
      numeroCelular: this.usuario.numeroCelular
    });
  }

  onSubmit() {
    if (this.crearClicked) {
      this.crear();
    } else {
      this.actualizar();
    }
  }

  public crear(): void {
    this.fabricarUsuario();
    this.usuarioService.guardar(this.usuario).subscribe(
      response => {
        this.dialogRef.close();
        this.usuarioService.notificar.emit(response);
        Swal.fire({
          icon: 'success',
          title: 'Nuevo Usuario',
          text: `Usuario ${this.usuario.nombre} creado con Exito!`
        });
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: err.error.mensaje,
          text: 'Nombre de la excepcion: ' + err.error.nombreExcepcion
        });
      }
    );
  }

  public actualizar(): void {
    this.fabricarUsuario();
    this.usuarioService.editar(this.usuario).subscribe(
      response => {
        this.dialogRef.close();
        this.usuarioService.notificar.emit(response);
        Swal.fire({
          icon: 'success',
          title: 'Se ha actualizado el Usuario',
          text: `Usuario ${this.usuario.nombre} actualizado con Exito!`
        });
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: err.error.mensaje,
          text: 'Nombre de la excepcion: ' + err.error.nombreExcepcion
        });
      }
    );
  }

  private fabricarUsuario(): void {
    this.usuario.nombre = this.usuarioForm.get('nombre').value;
    this.usuario.apellido = this.usuarioForm.get('apellido').value;
    this.usuario.identificacion = this.usuarioForm.get('identificacion').value;
    this.usuario.numeroCelular = this.usuarioForm.get('numeroCelular').value;
  }

  limpiarForm() {
    this.usuarioForm.reset();
  }

  onCrearClick() {
    this.crearClicked = true;
  }

  onEditarClick() {
    this.crearClicked = false;
  }

}
