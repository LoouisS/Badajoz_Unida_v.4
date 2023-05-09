import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  nombreUsuario: any = ";"

  /**
   * @ignore
   */
  constructor(public router: Router) {

    this.nombreUsuario = 'Usuario';
  }

  /**
   * @ignore
   */
  ngOnInit(): void {
  }

  /**
   * Valida si el usuario que ha iniciado sesión es administrador o no.
   *
   * @returns - Verdadero o falso
   */
  comprobarTipo() {
    // if (this.usuarioService.getTipoActual() == 'a') {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  /**
   * Cierra la sesión
   */
  cerrarSesion() {
    // this.usuarioService.cerrarSesion();

  }

  /**
   * Muestra u oculta el desplegable.
   */
  toggleOpt(){
    document.querySelector('.account-container>.desplegable')?.classList.toggle('hidden');
  }

  /**
   * Oculta el desplegable.
   */
  hideOpt(){
    document.querySelector('.account-container>.desplegable')?.classList.add('hidden');
  }

}
