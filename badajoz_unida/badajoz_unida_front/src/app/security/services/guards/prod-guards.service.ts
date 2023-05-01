import {TokenService} from "../auth/token.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class ProdGuardService implements CanActivate {

  realRol: string | undefined;

  constructor(private tokenService: TokenService, private router: Router) { }

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
