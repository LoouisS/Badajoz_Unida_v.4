/**
 @file Contiene la vista general de los procesos de login y registro
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../security/services/auth/auth.service";
import { LocaleHelper } from 'src/app/config/locale-helper';
import { LocalizedComponent } from 'src/app/config/localize.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

/**
 Vista de la vista general de los procesos de login y registro
 **/
export class AuthComponent extends LocalizedComponent implements OnInit{

  isFormRegistro: boolean = false;

  /**
   Constructor de la clase
   @param _authService {AuthService} Servicio que gestiona los métodos referentes al login y registro
   **/
  constructor(private _authService: AuthService) {
    super();
  }

  /**
   Método que inicializa la vista
   **/
  ngOnInit() {
    this._authService.getAuthMessage().subscribe((data: boolean) => {
      setTimeout(() => {
        this.isFormRegistro = data;
      });
    });
  }

  /**
   Método que llama al componente de login
   **/
  goToRegistro(){
    this._authService.goToRegistro();
  }

  /**
   Método que llama al componente de registro
   **/
  goToLogin(){
    this._authService.goToLogin()
  }

}
