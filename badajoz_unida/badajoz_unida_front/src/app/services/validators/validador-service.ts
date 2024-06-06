import { Injectable } from '@angular/core';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UsuariosService } from '../usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class ValidadorService {
  private allUsuarios: any[] = [];

  constructor(private _usuarioService: UsuariosService) {
    this.cargarUsuarios();
  }

  private cargarUsuarios() {
    this._usuarioService.getAll().subscribe((data:any[]) => {
      this.allUsuarios = data;
      console.log("Los usuarios de la aplicación",this.allUsuarios);
    });
  }

  usuarioExiste(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value.trim()) {
        return of(null);
      }
      const existe = this.allUsuarios.some(user => user.nombreUsuario === control.value);  // Asumiendo 'username' es la propiedad a comparar
      console.log(existe)
      return of(existe ? { usuarioExiste: true } : null);
    };
  }
}
