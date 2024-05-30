/**
 @file Contiene la vista del modal para crear una categoria
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MessageService } from 'primeng/api';
import { LocalizedComponent } from 'src/app/config/localize.component';
import Swal from "sweetalert2";
import {CategoriasService} from "../../../services/categorias.service";

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent extends LocalizedComponent implements OnInit{
  formCreateCat!: FormGroup;
  categoria: any;
  alert = Swal.mixin({
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    stopKeydownPropagation: true,
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-light'
    },
    buttonsStyling: false
  });
  loading: boolean;
  constructor(private messageService: MessageService, private formBuilder: FormBuilder, private catService: CategoriasService) {
    super();
  }
  ngOnInit() {
    this.initForm();
    this.loading = true;
    this.catService.getEditCategoria().subscribe((data) => {
      this.categoria = data;
      console.log("EN EL ONINIT",this.categoria);
      if (this.categoria != null){
        setTimeout(() => {
          this.loading = false;
          this.setFormEdit(this.categoria);
        },1000)

      }else{
        this.resetForm();
        this.loading = false;
      }

    })
  }

  /**
   Método que inicializa el formulario
   **/
  private initForm() {
  this.formCreateCat = this.formBuilder.group({
    nombreCat:['',[Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
    descripcionCategoria:['',[Validators.required,Validators.minLength(10), Validators.maxLength(500)]],
    activar:['']
    });
  }

  /**
   Método que valida los campos del formulario
   @param campo {string} Campo del formulario
   **/
  validar(campo: string): string | null {
    const control = this.formCreateCat.get(campo);

    if (control.invalid && control.touched) {
      if (control.errors?.['required']) {
        return 'Este campo es requerido.';
      }

      if (control.errors?.['minlength']) {
        const minLength = control.errors['minlength'].requiredLength;
        return `El valor mínimo es de ${minLength} caracteres.`;
      }

      if (control.errors?.['maxlength']) {
        const maxLength = control.errors['maxlength'].requiredLength;
        return `El valor máximo es de ${maxLength} caracteres.`;
      }

      // Validación adicional para el campo de nombreCat
      if (campo === 'nombreCat' && control.errors?.['minlength']) {
        const minLength = control.errors['minlength'].requiredLength;
        return `El nombre debe tener al menos ${minLength} caracteres.`;
      }

      // Validación adicional para el campo de descripcion
      if (campo === 'descripcion' && control.errors?.['minlength']) {
        const minLength = control.errors['minlength'].requiredLength;
        return `La descripción debe tener al menos ${minLength} caracteres.`;
      }

      // Si no se encuentra ningún error específico, devuelve el mensaje genérico
      return 'El valor ingresado no es válido.';
    }

    return null;
  }

  /**
   Método que envia los datos de una categoría para su registro
   **/
  sendCat() {
    if (this.formCreateCat.invalid || this.formCreateCat.pending) {
      console.log("MAAAAAAAL");
      console.log(this.formCreateCat);
      Object.values(this.formCreateCat.controls).forEach((control) => {
        if (control instanceof FormGroup)
          control.markAsTouched();
      });
      return;
    }
    this.alert.fire({
      icon:'question',
      title:'¿Estas seguro que deseas registrar una nueva categoría?',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const categoria ={
          titulo:this.formCreateCat.get('nombreCat').value,
          descripcion:this.formCreateCat.get('descripcionCategoria').value,
          activo:this.formCreateCat.get('activar').value,
          categoriaId: null
        }
        if (this.categoria != null){
          categoria.categoriaId = this.categoria.categoriaId
        }
        this.catService.registrarCategoria(categoria).subscribe((data) => {
          console.log("DATA", data);
                                            this.messageService.add({
          severity: 'success',
          summary: 'Listo',
          detail: 'Categoria creada correctamente',
        }),
          setTimeout(() => {
            window.location.reload();
          }, 1000)
        },error => {
                            this.messageService.add({
            severity: 'error',
            summary: 'Error al registrar',
            detail: 'No se ha podido registrar la categoria',
          });
        })

      } else {
                        this.messageService.add({
            severity: 'info',
            summary: 'Registro cancelado',
            detail: 'Vuelve a intentarlo cuando quieras',
          });
      }
    })
  }

  /**
   * Método para el seteo de valores en el formulario para la edición de una categoria
   * @param evento
   */
  setFormEdit(categoria: any){
    this.categoria = categoria;
    this.formCreateCat.setValue({
      nombreCat: categoria?.titulo,
      descripcionCategoria: categoria?.descripcion,
      activar: categoria?.activo
    });
  }

  /**
   * Método para el reinicio del formulario a valores en blanco
   */
  resetForm() {
    console.log("reseteando formulario")
    this.categoria = null;
    this.formCreateCat.reset();
  }

  /**
   * Método para eliminar el observable al cerrar el modal
   */
  cerrarModal() {
    this.catService.deleteEditCategoria();
  }
}
