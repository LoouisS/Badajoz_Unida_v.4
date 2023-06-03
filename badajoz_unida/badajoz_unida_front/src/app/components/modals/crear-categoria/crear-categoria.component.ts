import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {CategoriasService} from "../../../services/categorias.service";

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent implements OnInit{
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
  constructor(private formBuilder: FormBuilder, private catService: CategoriasService) {
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
      }

    })
  }
  private initForm() {
  this.formCreateCat = this.formBuilder.group({
    nombreCat:['',[Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
    descripcionCategoria:['',[Validators.required,Validators.minLength(10), Validators.maxLength(500)]],
    activar:['']
    });
  }
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
      this.alert.fire({
        title:'Espereme mientras gestionamos su solicitud',
        didOpen(popup: HTMLElement) {
          Swal.showLoading();
        }
      })
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
   * Método para el seteo de valores en el formulario para la edición de un evento
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
