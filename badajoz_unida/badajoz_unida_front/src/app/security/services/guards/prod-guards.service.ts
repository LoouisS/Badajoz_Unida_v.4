/**
 @file Protector que comprueba los permisos del usuario
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {TokenService} from "../auth/token.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})

/**
 Guardia que comprueba los permisos del usuario
 **/
export class ProdGuardService implements CanActivate {

  realRol: string | undefined;

  /**
   Constructor de la clase
   @param tokenService {TokenService} Servicio que gestiona el token de acceso,
   @param router {Router} Clase para la navegación entre componentes
   **/
  constructor(private tokenService: TokenService, private router: Router) { }

  /**
   Método que comprueba los permisos del usuario a través de los datos insertados en el token de acceso
   @return {boolean} Verdadero en caso de que tenga permisos de administrador, falso en caso de que no
   **/
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data['expectedRol'];
    this.realRol=this.tokenService.getIsAdmin()?'admin':'user';
    if (!this.tokenService.isLogged() || expectedRol.indexOf(this.realRol) <0) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
