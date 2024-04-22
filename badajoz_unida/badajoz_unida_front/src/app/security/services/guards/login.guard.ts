/**
 @file Protector que se asegura que el usuario tenga la sesión activa
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {TokenService} from "../auth/token.service";
import { UsuariosService } from 'src/app/services/usuarios.service';

@Injectable({
  providedIn: 'root'
})

/**
 Guardia que comprueba que el usuario tenga una sesión iniciada
 **/
export class LoginGuard implements CanActivate {

  /**
   Constructor de la clase
   @param tokenService {TokenService} Servicio que gestiona el token de acceso,
   @param router {Router} Clase para la navegación entre componentes
   **/
  constructor(private tokenService: TokenService, private router: Router, private userService: UsuariosService) { }

  /**
   Método que comprueba la existencia de la sesión
   @return {boolean} Verdadero si existe la sesión, false en caso de que no
   **/
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(!this.tokenService.isLogged()){
      this.router.navigate(['/auth']);
      return false;
    }
    this.setLoggedInUserData();
    return true;
  }

  private setLoggedInUserData() {
    this.userService.getDatosUsuario().subscribe((data: any) => {
      const usuario = data;
      this.userService.setUser(usuario);
    })
  }

}
