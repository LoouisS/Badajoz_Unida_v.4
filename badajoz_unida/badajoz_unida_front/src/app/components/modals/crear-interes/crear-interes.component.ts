/**
 @file Contiene la vista del modal para crear un interes
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InteresesService} from "../../../services/intereses.service";
import {CategoriasService} from "../../../services/categorias.service";

@Component({
  selector: 'app-crear-interes',
  templateUrl: './crear-interes.component.html',
  styleUrls: ['./crear-interes.component.css']
})
export class CrearInteresComponent implements OnInit{
  formCreateInteres!: FormGroup;
  categorias: any;
  interes:any;
  loading: boolean;
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
  constructor(private formBuilder: FormBuilder, private intService: InteresesService, private catService: CategoriasService) {
  }
  ngOnInit() {
    this.initForm();
    this.loading = true;
    this.catService.getCategorias().subscribe((data) => {
      this.categorias = data;
      this.loading = false;
    })
    this.intService.getEditInteres().subscribe((data) => {
      this.interes = data;
      console.log("EN EL ONINIT",this.interes);
      if (this.interes != null){
        setTimeout(() => {
          this.loading = false;
          this.setFormEdit(this.interes);
        },1000)

      }else{
        this.resetForm();
      }

    })
  }

  /**
   Método que inicializa el formulario
   **/
  private initForm() {
    this.formCreateInteres = this.formBuilder.group({
      nombreInt:['',[Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      descripcionInt:['',[Validators.required,Validators.minLength(10), Validators.maxLength(500)]],
      categoria:['',Validators.required],
      activar:['']
    });
  }

  /**
   Método que valida los campos del formulario
   @param campo {string} Nombre del campo del formulario
   **/
  validar(campo: string): string | null {
    const control = this.formCreateInteres.get(campo);

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
      if (campo === 'nombreInt' && control.errors?.['minlength']) {
        const minLength = control.errors['minlength'].requiredLength;
        return `El nombre debe tener al menos ${minLength} caracteres.`;
      }

      // Validación adicional para el campo de descripcion
      if (campo === 'descripcionInt' && control.errors?.['minlength']) {
        const minLength = control.errors['minlength'].requiredLength;
        return `La descripción debe tener al menos ${minLength} caracteres.`;
      }

      // Si no se encuentra ningún error específico, devuelve el mensaje genérico
      return 'El valor ingresado no es válido.';
    }

    return null;
  }
  /**
   * Método para el seteo de valores en el formulario para la edición de un interes
   * @param evento
   */
  private setFormEdit(interes: any) {
    this.formCreateInteres.setValue({
      nombreInt: interes?.titulo,
      descripcionInt: interes?.descripcion,
      activar: interes?.activo,
      categoria:interes?.categoria?.categoriaId
    });
  }
  /**
   * Método para el reinicio del formulario a valores en blanco
   */
  private resetForm() {
    console.log("reseteando formulario")
    this.interes = null;
    this.formCreateInteres.reset();
  }

  /**
   Método que registra los datos de una categoria
   **/
  sendCat() {
    if (this.formCreateInteres.invalid || this.formCreateInteres.pending) {
      console.log("MAAAAAAAL");
      console.log(this.formCreateInteres);
      Object.values(this.formCreateInteres.controls).forEach((control) => {
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
      this.alert.fire({
        title:'Espereme mientras gestionamos su solicitud',
        didOpen(popup: HTMLElement) {
          Swal.showLoading();
        }
      })
      if (result.isConfirmed) {
        const interes ={
          titulo:this.formCreateInteres.get('nombreInt').value,
          descripcion:this.formCreateInteres.get('descripcionInt').value,
          activo:this.formCreateInteres.get('activar').value,
          categoria:{
            categoriaId: this.formCreateInteres.get('categoria').value
          },
          interesId: null
        }
        if (this.interes != null){
          interes.interesId = this.interes.interesId
        }
        console.log("EL INTERES",interes)
        this.intService.registrarInteres(interes).subscribe((data) => {
          console.log("DATA", data);
          this.alert.fire({
            icon:'success',
            title:'Evento registrado con éxito',
            timer:4000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 4000)
        },error => {
          this.alert.fire({
            icon:'error',
            title:'No se ha podido realizar el registro',
            text: error.error,
            timer:4000,
          })
        })

      } else {
        this.alert.fire({
          title: 'Registro cancelado con éxito',
          text: 'Te seguimos esperando, vuelve a intentarlo cuando quieras',
          icon: 'info',
          timer: 4000,
          showConfirmButton: false,
          showCancelButton: false,
        })
      }
    })
  }
  /**
   * Método para eliminar el observable al cerrar el modal
   */
  cerrarModal() {
    this.intService.deleteEditInteres();
  }
}
