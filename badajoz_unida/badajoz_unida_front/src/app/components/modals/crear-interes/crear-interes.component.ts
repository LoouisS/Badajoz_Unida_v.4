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
import { LocalizedComponent } from 'src/app/config/localize.component';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-crear-interes',
  templateUrl: './crear-interes.component.html',
  styleUrls: ['./crear-interes.component.css']
})
export class CrearInteresComponent extends LocalizedComponent implements OnInit{
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
  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private intService: InteresesService, private catService: CategoriasService) {
    super();
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
        return `${this.resources.categoryRequired}`;
      }

      if (control.errors?.['minlength']) {
        const minLength = control.errors['minlength'].requiredLength;
        return `${this.resources.minChar} ${minLength}`;
      }

      if (control.errors?.['maxlength']) {
        const maxLength = control.errors['maxlength'].requiredLength;
        return `${this.resources.maxChar} ${maxLength}`;
      }

      // Validación adicional para el campo de nombreCat
      if (campo === 'nombreInt' && control.errors?.['minlength']) {
        const minLength = control.errors['minlength'].requiredLength;
        return `${this.resources.minChar} ${minLength}`;
      }

      // Validación adicional para el campo de descripcion
      if (campo === 'descripcionInt' && control.errors?.['minlength']) {
        const minLength = control.errors['minlength'].requiredLength;
        return `${this.resources.minChar} ${minLength}`;
      }

      // Si no se encuentra ningún error específico, devuelve el mensaje genérico
      return `${this.resources.notValidValue}`;
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
    this.interes = null;
    this.formCreateInteres.reset();
  }

  /**
   Método que registra los datos de una categoria
   **/
  sendCat() {
    if (this.formCreateInteres.invalid || this.formCreateInteres.pending) {
      Object.values(this.formCreateInteres.controls).forEach((control) => {
        if (control instanceof FormGroup)
          control.markAsTouched();
      });
      return;
    }
    this.alert.fire({
      icon:'question',
      title:`${this.resources.createInterestMessage}`,
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
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
        const create = this.intService.create;
        this.intService.registrarInteres(interes, create).subscribe((data) => {
            this.messageService.add({severity:'success', summary:`${this.resources.ready}`, detail:`${this.resources.interestCreated}`});
            window.location.reload();
        },error => {
              this.messageService.add({severity:'error', summary:`${this.resources.problemOcurred}`, detail:`${this.resources.sameInterest}`});
        })

      } else {
          this.messageService.add({severity:'info', summary:`${this.resources.info}`, detail:`${this.resources.eventCreationCancelled}`});
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
